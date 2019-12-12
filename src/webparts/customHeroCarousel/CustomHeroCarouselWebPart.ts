import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from '@microsoft/sp-http';
import { sp, Item, Web } from "@pnp/sp";
import { AttachmentFile, AttachmentFiles, AttachmentFileInfo } from '@pnp/sp/src/attachmentfiles'; 
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
require('core-js/es6/array');
require('es6-map/implement');
require('core-js/modules/es6.array.find');
import * as strings from 'CustomHeroCarouselWebPartStrings';
import 'jquery';
import TemplateCarousel from './TemplateCarousel';
import { SPComponentLoader } from '@microsoft/sp-loader';
require('bootstrap');

export interface ICustomHeroCarouselWebPartProps {
  description: string;
}

export default class CustomHeroCarouselWebPart extends BaseClientSideWebPart<ICustomHeroCarouselWebPartProps> {

  //Retrieve all the attachments from all items in a SharePoint List  
  private getSPData(): void {  
    let attachmentfiles: string = "";
    let partOne: string = "";
    let partTwo: string = "";
    let partThree: string = "";
    let web = new Web(this.context.pageContext.web.absoluteUrl);  
  
    web.lists.getByTitle("CustomHeroImageList").items  
    .select("Title,CaptionText,HrefURL,DisplayOrder,Attachments,AttachmentFiles")  
    .expand("AttachmentFiles")  
    .filter(`Attachments eq 1 and Published eq 1`)
    .orderBy("DisplayOrder")  
    .get().then((response: Item[]) => { 

      response.forEach((listItem: any) => { 
        listItem.AttachmentFiles.forEach((afile: any) => {
          attachmentfiles += `
          <div class="item ${listItem.DisplayOrder === 1 ? "active" : ""}">
          <a href="${listItem.HrefURL}" target="_blank">
          <img src="https://skyappscsg.sharepoint.com${afile.ServerRelativeUrl}" alt="Breakthru Beverage Group" style="width:100%;"></a>
          <div class="carousel-caption">
             <h3>${listItem.Title == null ? "" : listItem.Title}</h3>
             <p>${listItem.CaptionText == null ? "" : listItem.CaptionText}</p>
          </div>
        </div>`;        
        });  
      });
      
      if(response.length > 0){

        var listItemCount = "";
        for (let i = 0; i < response.length; i++) { 
          
          listItemCount += `<li data-target="#myCarousel" data-slide-to="${i}" class="${i == 0 ? "active" : ""}"></li>`;

          partOne = `
            <div id="myCarousel" class="carousel slide" data-ride="carousel">
                <!-- Indicators -->`;
                partTwo = `<ol class='carousel-indicators'>
                    ${listItemCount}
                    </ol>`;
                partThree = `<!-- Wrapper for slides -->

                <div class="carousel-inner">

                    <!-- slides come from SharePoint List called CustomHeroImageList -->           
                      ${attachmentfiles}

                </div>
                
                <!-- Left and right controls -->
                <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left"></span>
                <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#myCarousel" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right"></span>
                <span class="sr-only">Next</span>
                </a>
            </div>`; 
        }

      }
      
      this.renderData(partOne + partTwo + partThree);        
    });  
  }
  private renderData(strResponse: string): void {
    const htmlElement = this.domElement.querySelector("#CustomHeroImageLIst");
    htmlElement.innerHTML = strResponse;
  }

  public render(): void {
    let cssBootstrap = "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css";
    let cssMain = "https://skyappscsg.sharepoint.com/CustomHeroAssets/CustomHero.css";
    SPComponentLoader.loadCss(cssBootstrap);
    SPComponentLoader.loadCss(cssMain);

    this.domElement.innerHTML = TemplateCarousel.templateHtml;
    this.getSPData();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
