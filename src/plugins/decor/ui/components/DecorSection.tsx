/*
 * Vencord, a Discord client mod
 * Copyright (c) 2023 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Flex } from "@components/Flex";
import { findByCodeLazy } from "@webpack";
import { Button, useEffect } from "@webpack/common";

import { useCurrentUserDecorationsStore } from "../../lib/stores/CurrentUserDecorationsStore";
import { cl } from "../";
import { openChangeDecorationModal } from "../modals/ChangeDecorationModal";

const CustomizationSection = findByCodeLazy(".customizationSectionBackground");

export interface DecorSectionProps {
    hideTitle?: boolean;
    hideDivider?: boolean;
    noMargin?: boolean;
}

export default function DecorSection({ hideTitle = false, hideDivider = false, noMargin = false }: DecorSectionProps) {
    const { selectedDecoration, select: selectDecoration, fetch: fetchDecorations } = useCurrentUserDecorationsStore();

    useEffect(() => {
        fetchDecorations();
    }, []);

    return (
        <CustomizationSection
            title={!hideTitle && "Decor"}
            hasBackground={true}
            hideDivider={hideDivider}
            className={noMargin && cl("section-remove-margin")}
        >
            <Flex>
                <Button
                    onClick={openChangeDecorationModal}
                    size={Button.Sizes.SMALL}
                >
                    Change Decoration
                </Button>
                {selectedDecoration && (
                    <Button
                        onClick={() => selectDecoration(null)}
                        color={Button.Colors.PRIMARY}
                        size={Button.Sizes.SMALL}
                        look={Button.Looks.LINK}
                    >
                        Remove Decoration
                    </Button>
                )}
            </Flex>
        </CustomizationSection>
    );
}
