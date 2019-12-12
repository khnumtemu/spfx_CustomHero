export default class TemplateCarousel {
  public static templateHtml: string =`
  <div class="hero-container">
    <div class="row no-pad">
    
      <div class="col-md-6">
        <div class="row no-pad">
          <div class="col-md-12" id="CustomHeroImageLIst">
  
          <!-- THIS IS WHERE THE ROTATOR WILL BE INJECTED -->
  
          </div>
        </div>
      </div>
    
      <div class="col-md-6">
        <div class="row no-pad">
        
          <!-- THIS IS WHERE FIRST ROW OF 2 COLUMN IMAGES WILL GO -->
          <div class="col-md-6 img-hover-zoom">
            <a href="https://breakthrubev.icims.com/icims2/servlet/icims2?module=Root&action=samlAuthnRequest&RelayState=https://associates-breakthrubev.icims.com/r.jsp" target="_blank">
            <img alt="Careers" src="https://skyappscsg.sharepoint.com/sites/BBG/CustomHeroAssets/TopLeft.jpg" class="hero-img img-responsive" /></a>
          </div>
          
          <div class="col-md-6 img-hover-zoom">
            <a href="https://wd5.myworkday.com/breakthru/fx/home.flex" target="_blank">
            <img alt="Workday" src="https://skyappscsg.sharepoint.com/sites/BBG/CustomHeroAssets/TopRight.jpg" class="hero-img img-responsive" /></a>
          </div>
        </div>  
  
        <div class="row no-pad">

          <!-- THIS IS WHERE SECOND ROW OF 2 COLUMN IMAGES WILL GO -->
          <div class="col-md-6 img-hover-zoom">
            <a href="http://support.breakthrubev.com/" target="_blank">
            <img alt="IT Center" src="https://skyappscsg.sharepoint.com/sites/BBG/CustomHeroAssets/BottomLeft.jpg" class="hero-img img-responsive" /></a>
          </div>

          <div class="col-md-6 img-hover-zoom">
            <a href="https://sts.charmer-sunbelt.com/adfs/ls/IdpInitiatedSignon.aspx?LoginToRP=CornerstoneProdIdP" target="_blank">
            <img alt="Learning Bar" src="https://skyappscsg.sharepoint.com/sites/BBG/CustomHeroAssets/BottomRight.jpg" class="hero-img img-responsive" /></a>
          </div>
        </div>

      </div>
    </div>
  </div>`;
}