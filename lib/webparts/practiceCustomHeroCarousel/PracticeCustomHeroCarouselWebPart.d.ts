import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import 'jquery';
export interface IPracticeCustomHeroCarouselWebPartProps {
    description: string;
}
export default class PracticeCustomHeroCarouselWebPart extends BaseClientSideWebPart<IPracticeCustomHeroCarouselWebPartProps> {
    private getSPData;
    private renderData;
    render(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=PracticeCustomHeroCarouselWebPart.d.ts.map