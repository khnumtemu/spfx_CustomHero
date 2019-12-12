import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import 'jquery';
export interface ICustomHeroCarouselWebPartProps {
    description: string;
}
export default class CustomHeroCarouselWebPart extends BaseClientSideWebPart<ICustomHeroCarouselWebPartProps> {
    private getSPData;
    private renderData;
    render(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=CustomHeroCarouselWebPart.d.ts.map