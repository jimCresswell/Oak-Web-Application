import { FC } from "react";

import { SvgProps } from "../../getSvgId";

const IconBackground: FC<SvgProps> = (props) => {
  return (
    <symbol viewBox="0 0 36 36" {...props}>
      <path
        d="M4.7486 5.68324C4.30761 6.15954 3.90018 6.65434 3.5287 7.16069L3.25788 7.53757L3.02541 7.87977C2.87681 8.10867 2.73302 8.33988 2.59641 8.57341C2.32079 9.04278 2.07394 9.51676 1.85345 9.99538L1.69527 10.3561L1.55866 10.6867C1.48436 10.874 1.41007 11.0636 1.34296 11.2555C1.20875 11.6393 1.08891 12.0231 0.985858 12.4046C0.935529 12.5965 0.887596 12.7884 0.842059 12.9803C0.801316 13.1723 0.758177 13.378 0.73421 13.4983C0.631154 14.0555 0.559255 14.615 0.520908 15.1699L0.496942 15.5815L0.492149 15.7295L0.484959 15.852L0.477769 16.0948C0.477769 16.2543 0.470579 16.4162 0.468182 16.5757C0.456199 17.8451 0.499339 19.0705 0.779747 20.7075C0.808506 20.8694 0.846853 21.0751 0.899579 21.3087C0.949909 21.5422 1.01462 21.7942 1.08891 22.0601C1.23271 22.6012 1.42205 23.1491 1.60899 23.6208C2.09551 24.8694 2.71864 26.0879 3.28664 27.022C3.56945 27.496 3.83787 27.896 4.05357 28.2358C4.27406 28.5619 4.44422 28.8139 4.5353 28.9711C4.65513 29.1861 4.94273 29.5931 5.1776 29.889C5.29503 30.037 5.40049 30.1734 5.47958 30.2705C5.55627 30.3676 5.6018 30.4277 5.59701 30.4324C5.55147 30.4763 5.78874 30.7607 6.20336 31.1514C6.62038 31.5353 7.22194 32.0254 7.89779 32.4786C8.23572 32.7075 8.59762 32.9225 8.95232 33.1283C9.29983 33.3249 9.6066 33.4751 9.91338 33.6231C10.5053 33.9006 11.0062 34.0832 11.2627 34.1272C11.639 34.1965 12.2261 34.3468 12.5545 34.4416C12.9403 34.5665 13.5131 34.6913 14.0644 34.7815C14.6036 34.8624 15.1261 34.9156 15.4089 34.9087C15.6486 34.9087 15.9601 34.904 16.1015 34.904C16.2381 34.8994 16.5257 34.8694 16.7414 34.837C16.9571 34.8046 17.1393 34.7861 17.1537 34.8023C17.168 34.8208 17.192 34.8416 17.2016 34.8532C17.216 34.8624 17.3454 34.8393 17.4892 34.8C17.633 34.7607 17.7696 34.7329 17.7936 34.7353C18.0668 34.7815 18.3424 34.8301 18.455 34.8555C18.5317 34.874 18.6324 34.8856 18.6779 34.8856C18.757 34.8809 19.2531 34.9618 19.3466 34.9942C19.4568 35.0335 19.5982 35.0566 19.6246 35.0428C19.6414 35.0335 19.6677 35.0312 19.6869 35.0312C19.7037 35.0335 19.7804 35.0428 19.8547 35.0543C19.9314 35.0659 19.9769 35.1538 19.9649 35.2509C19.9505 35.3503 19.9649 35.3919 20.0009 35.341C20.1255 35.1584 20.183 35.1422 20.2166 35.2809C20.231 35.3595 20.2669 35.348 20.2957 35.2555C20.3172 35.1676 20.3364 35.1491 20.3316 35.2254C20.3316 35.2994 20.3843 35.3873 20.4562 35.422C20.7007 35.5353 20.8061 35.6393 20.8038 35.778C20.8038 35.852 20.8133 35.8682 20.8301 35.8081C20.8469 35.7503 20.8541 35.7942 20.8493 35.9052C20.8397 36.0208 20.8493 36.0347 20.8685 35.9376C20.8852 35.8428 20.9332 35.8058 20.9763 35.8474C21.041 35.9121 21.0602 35.8798 21.0961 35.637C21.1177 35.4821 21.1441 35.3549 21.1561 35.348C21.1656 35.3503 21.1609 35.4381 21.1441 35.5538C21.1033 35.822 21.1776 35.8867 21.2375 35.6393C21.2711 35.5191 21.2759 35.5491 21.2543 35.7249C21.2351 35.926 21.2399 35.9422 21.2783 35.7896C21.3214 35.5838 21.494 35.6069 21.7456 35.8382C21.796 35.8798 21.8439 35.8613 21.8559 35.7896C21.8822 35.6277 22.062 35.6624 22.1075 35.8382C22.1339 35.9306 22.1627 35.8913 22.2058 35.7017C22.2298 35.5977 22.2441 35.5399 22.2585 35.5306C22.2633 35.5214 22.2729 35.526 22.2801 35.5491C22.3088 35.5769 22.3352 35.5977 22.3568 35.6162C22.4455 35.6948 22.4742 35.711 22.3951 35.6162C22.3544 35.5723 22.364 35.5723 22.4191 35.6162C22.5725 35.7503 22.6731 35.704 22.5773 35.5491C22.5293 35.4705 22.5341 35.4566 22.5845 35.5145C22.6108 35.5445 22.8313 35.4173 23.1764 35.1607C23.5168 34.9156 23.9793 34.5387 24.4778 34.0879C24.9907 33.6116 25.4868 33.1538 25.8775 32.7977C26.2825 32.4162 26.5821 32.1503 26.6875 32.0856C27.1237 31.852 27.3873 31.6971 27.8116 31.4012C27.9673 31.2925 28.1926 31.1468 28.3148 31.0798C28.5617 30.9295 28.902 30.7006 29.3957 30.2775C29.5731 30.1249 29.8391 29.9052 29.9901 29.7896C30.3352 29.5121 30.7139 29.1538 31.2196 28.541C31.4329 28.2913 31.7253 27.9422 31.8715 27.7988C31.9434 27.7249 32.0536 27.6 32.1735 27.4543C32.2957 27.304 32.4251 27.1306 32.5306 26.9757C32.7463 26.6751 33.041 26.2243 33.1872 26.0069C33.8247 25.0566 34.2058 24.3237 34.5006 23.6139C34.7906 22.8971 35.0063 22.1988 35.1956 21.163C35.4521 19.7017 35.3898 19.2971 35.2004 19.2832C35.0111 19.2671 35.0087 19.2601 35.1932 19.2555C35.3754 19.2509 35.4736 18.985 35.5 18.037C35.5336 16.2335 35.3586 15.126 35.2939 14.4671C35.222 13.8035 35.2244 13.5815 35.3274 13.5399C35.4688 13.4844 35.4688 13.4613 35.3274 13.4705C35.1908 13.4775 35.0111 13.0358 34.7546 12.2497C34.5533 11.6416 34.2633 10.9665 33.9949 10.4601C33.7337 9.94913 33.4988 9.60462 33.4557 9.59075C33.4293 9.58382 33.4221 9.56532 33.4365 9.54913C33.4676 9.51445 33.3766 9.32254 33.1225 8.9526C32.8685 8.58266 32.4515 8.03931 31.7948 7.35029C31.0398 6.56879 30.2969 5.83815 29.4988 5.09364C29.0938 4.71908 28.6863 4.34682 28.2286 3.95838C27.7804 3.57225 27.2891 3.16763 26.7163 2.74451C26.5461 2.61734 26.3352 2.46936 26.0404 2.28671C25.8918 2.19422 25.7576 2.11329 25.5755 2.00694C25.3981 1.90751 25.2088 1.80578 25.0147 1.70636C24.183 1.28786 23.0973 0.804624 21.4796 0.427746L21.2423 0.374566L20.9787 0.319075C20.8037 0.284393 20.6312 0.254335 20.4562 0.224277L20.1974 0.184971L19.9002 0.143353C19.6821 0.115607 19.464 0.0924856 19.2459 0.0716763C19.0302 0.0508671 18.8145 0.0346821 18.5988 0.0231214C18.4646 0.0184971 18.3328 0.0138728 18.1986 0.00693642C18.0596 0.00462428 17.9206 0.00462428 17.7816 0C17.204 0.00231214 16.763 0.00924855 15.9625 0.0901734C15.603 0.12948 15.2483 0.175723 14.896 0.233526C14.7163 0.263584 14.5557 0.291329 14.364 0.328324C14.1339 0.374566 13.9038 0.425434 13.6761 0.478613C13.2208 0.587283 12.7702 0.714451 12.3316 0.855491C12.1087 0.927168 11.9002 0.998844 11.6725 1.08439C11.3993 1.18382 11.1309 1.29249 10.8624 1.40578C10.3256 1.63468 9.80073 1.88671 9.29504 2.16185L8.92116 2.36994C8.79654 2.44162 8.6815 2.50867 8.53051 2.59884C8.2501 2.76994 7.97449 2.95029 7.70127 3.13757C6.606 3.89364 5.64015 4.72601 4.75818 5.68092L4.7486 5.68324Z"
        fill="currentColor"
      />
    </symbol>
  );
};

export default IconBackground;