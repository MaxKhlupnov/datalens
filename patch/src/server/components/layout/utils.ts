import {Script} from '@gravity-ui/app-layout';
import isMobile from 'ismobilejs';

import {ChartkitGlobalSettings, DeviceType} from '../../../shared';

export function getPlatform(userAgent: string | undefined) {
    const ua = isMobile(userAgent);

    if (ua.phone) {
        return DeviceType.Phone;
    } else if (ua.tablet) {
        return DeviceType.Tablet;
    }

    return DeviceType.Desktop;
}

type ChartkitLayoutConfig = {
    scripts: Script[];
    inlineScripts: string[];
};

export function getChartkitLayoutSettings(
    chartkitSettings: ChartkitGlobalSettings = {},
): ChartkitLayoutConfig {
    const chartkitScripts = [];
    const chartkitInlineScripts = [];

    if (!chartkitSettings.highcharts?.enabled) {
        chartkitInlineScripts.push(`window.Highcharts = {enabled: false};`);
    } else if (chartkitSettings.highcharts.external) {
         // local highcharts deployment
        const {domain = '/build/js/highcharts/', version, modules = []} = chartkitSettings.highcharts;
        const items = [
            'highcharts',
            'highcharts-more',
            ...modules.map((item) => `modules/${item}`),
        ];

        chartkitScripts.push(
            ...items.map((item) => ({
               // local highcharts deployment
                src: `${domain}${version ? `/${version}` : ''}/${item}.js`,
                defer: true,
            })),
        );
    }

    return {
        scripts: chartkitScripts,
        inlineScripts: chartkitInlineScripts,
    };
}
