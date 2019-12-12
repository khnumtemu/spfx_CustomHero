var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Web } from "@pnp/sp";
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
require('core-js/es6/array');
require('es6-map/implement');
require('core-js/modules/es6.array.find');
import * as strings from 'PracticeCustomHeroCarouselWebPartStrings';
import 'jquery';
import PracticeTemplateCarousel from './PracticeTemplateCarousel';
import { SPComponentLoader } from '@microsoft/sp-loader';
require('bootstrap');
var PracticeCustomHeroCarouselWebPart = /** @class */ (function (_super) {
    __extends(PracticeCustomHeroCarouselWebPart, _super);
    function PracticeCustomHeroCarouselWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //Retrieve all the attachments from all items in a SharePoint List  
    PracticeCustomHeroCarouselWebPart.prototype.getSPData = function () {
        var _this = this;
        var attachmentfiles = "";
        var partOne = "";
        var partTwo = "";
        var partThree = "";
        var web = new Web(this.context.pageContext.web.absoluteUrl);
        web.lists.getByTitle("CustomHeroImageList").items
            .select("Title,CaptionText,HrefURL,DisplayOrder,Attachments,AttachmentFiles")
            .expand("AttachmentFiles")
            .filter("Attachments eq 1 and Published eq 1")
            .orderBy("DisplayOrder")
            .get().then(function (response) {
            response.forEach(function (listItem) {
                listItem.AttachmentFiles.forEach(function (afile) {
                    attachmentfiles += "\n          <div class=\"item " + (listItem.DisplayOrder === 1 ? "active" : "") + "\">\n          <a href=\"" + listItem.HrefURL + "\" target=\"_blank\">\n          <img src=\"https://skyappscsg.sharepoint.com" + afile.ServerRelativeUrl + "\" style=\"width:100%;\"></a>\n          <div class=\"carousel-caption\">\n             <h3>" + (listItem.Title == null ? "" : listItem.Title) + "</h3>\n             <p>" + (listItem.CaptionText == null ? "" : listItem.CaptionText) + "</p>\n          </div>\n        </div>";
                });
            });
            if (response.length > 0) {
                var listItemCount = "";
                for (var i = 0; i < response.length; i++) {
                    listItemCount += "<li data-target=\"#myCarousel\" data-slide-to=\"" + i + "\" class=\"" + (i == 0 ? "active" : "") + "\"></li>";
                    partOne = "\n            <div id=\"myCarousel\" class=\"carousel slide\" data-ride=\"carousel\">\n                <!-- Indicators -->";
                    partTwo = "<ol class='carousel-indicators'>\n                    " + listItemCount + "\n                    </ol>";
                    partThree = "<!-- Wrapper for slides -->\n\n                <div class=\"carousel-inner\">\n\n                    <!-- slides come from SharePoint List called CustomHeroImageList -->           \n                      " + attachmentfiles + "\n\n                </div>\n                \n                <!-- Left and right controls -->\n                <a class=\"left carousel-control\" href=\"#myCarousel\" data-slide=\"prev\">\n                <span class=\"glyphicon glyphicon-chevron-left\"></span>\n                <span class=\"sr-only\">Previous</span>\n                </a>\n                <a class=\"right carousel-control\" href=\"#myCarousel\" data-slide=\"next\">\n                <span class=\"glyphicon glyphicon-chevron-right\"></span>\n                <span class=\"sr-only\">Next</span>\n                </a>\n            </div>";
                }
            }
            _this.renderData(partOne + partTwo + partThree);
        });
    };
    PracticeCustomHeroCarouselWebPart.prototype.renderData = function (strResponse) {
        var htmlElement = this.domElement.querySelector("#CustomHeroImageLIst");
        htmlElement.innerHTML = strResponse;
    };
    PracticeCustomHeroCarouselWebPart.prototype.render = function () {
        var cssBootstrap = "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css";
        var cssMain = "https://skyappscsg.sharepoint.com/CustomHeroAssets/CustomHero.css";
        SPComponentLoader.loadCss(cssBootstrap);
        SPComponentLoader.loadCss(cssMain);
        this.domElement.innerHTML = PracticeTemplateCarousel.templateHtml;
        this.getSPData();
    };
    Object.defineProperty(PracticeCustomHeroCarouselWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    PracticeCustomHeroCarouselWebPart.prototype.getPropertyPaneConfiguration = function () {
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
    };
    return PracticeCustomHeroCarouselWebPart;
}(BaseClientSideWebPart));
export default PracticeCustomHeroCarouselWebPart;
//# sourceMappingURL=PracticeCustomHeroCarouselWebPart.js.map