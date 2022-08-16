import { FC } from "react";

import { SvgProps } from "../getSvgId";

const Hamburger: FC<SvgProps> = (props) => {
  return (
    <symbol viewBox="0 0 30 30" fill="none" {...props}>
      <path
        d="M3 13.578C3.34155 13.0813 3.70457 12.9919 4.08278 13.0005C6.58632 13.0555 9.0845 13.0762 11.5854 13.1724C14.189 13.2686 16.7918 13.4525 19.3955 13.5608C21.3849 13.6433 23.3761 13.6502 25.3664 13.7326C25.7353 13.7723 26.1013 13.8817 26.4591 14.0592C26.7809 14.1984 26.9785 14.8394 26.9428 15.4632C26.9297 15.6915 26.927 15.9215 26.9347 16.1507C26.95 16.3677 26.9718 16.5829 27 16.7951C26.8101 16.8809 26.617 16.9384 26.4224 16.967C24.9641 16.9756 23.5031 17.0529 22.0466 16.936C20.5167 16.8123 18.9878 16.8346 17.4588 16.7848C13.961 16.6702 10.4635 16.5442 6.96632 16.4067C6.10349 16.3706 5.24246 16.2211 4.38142 16.1025C4.15874 16.0683 3.93834 15.9923 3.72335 15.8757C3.24857 15.6248 3.02236 15.0164 3.00805 14.0643C3.01073 13.9114 3.00447 13.7705 3 13.578ZM26.0683 14.2809V14.3977H26.3258C26.3258 14.3513 26.3258 14.3049 26.3258 14.2568L26.0683 14.2809ZM26.0978 16.2211C26.215 15.6007 26.215 15.6007 26.0192 15.6248C26.0406 15.8241 26.0674 16.0235 26.0934 16.2211H26.0978ZM19.8193 16.4772L19.8005 16.5614H20.2476V16.4772H19.8193ZM19.67 15.3618L19.6566 15.3051H19.4196V15.3618H19.67ZM26.4895 16.7522L26.5047 16.6576H26.1694V16.7522H26.4895Z"
        fill="black"
      />
      <path
        d="M6.21366 9.77849C6.11928 9.86348 5.98039 10.0796 5.86936 10.0751C5.09561 10.0444 4.25326 10.5162 3.5286 9.89527C3.73938 8.67598 3.96575 7.52203 3.84501 6.33534C4.10981 6.21944 4.35593 6.02252 4.57742 6.02918C5.81172 6.06694 7.03858 6.17121 8.27256 6.21765C8.99223 6.24526 9.73822 6.08259 10.4385 6.23171C11.1387 6.38082 11.8542 6.29891 12.5728 6.21961C13.5424 6.11184 14.5243 5.87721 15.4912 5.79521C16.2995 5.72832 17.0918 5.80954 17.8929 5.81356C19.191 5.81655 20.4871 5.84544 21.7908 5.80128C23.2136 5.75181 24.6081 5.94462 25.964 6.37831C26.046 6.41609 26.1251 6.46853 26.2008 6.53524C26.7907 6.95451 26.8102 7.05525 26.6729 8.62023C26.5895 9.56081 26.4494 9.94451 26.0312 10.0828C25.6572 10.1949 25.2887 10.2307 24.9298 10.1898C23.7003 10.0982 22.4806 9.93608 21.249 9.85948C19.7678 9.76362 18.2914 9.68367 16.8027 9.68045C15.7089 9.68173 14.6 9.81164 13.4961 9.90521C12.3476 10.0035 11.197 10.1233 10.0464 10.2431C9.80728 10.2688 9.6378 9.9687 9.37469 10.0151C8.70335 10.1402 8.04679 10.0821 7.38508 10.093C7.06718 10.0969 6.74898 10.1031 6.43495 10.0727C6.36767 10.0634 6.31243 9.9098 6.21366 9.77849ZM6.39365 6.70299C6.4664 7.02243 6.78535 6.57849 6.69275 7.26725C6.74423 7.27547 6.79691 7.27474 6.85041 7.26509C6.9385 6.70425 7.12465 7.01105 7.31317 6.83013L6.39365 6.70299ZM8.94787 6.9603L8.95792 6.88761L8.63531 6.843L8.62526 6.91569L8.94787 6.9603ZM8.74124 7.29122L8.72823 7.38529L9.01279 7.37452L9.019 7.32962L8.74124 7.29122ZM10.052 7.50732L10.0535 7.49663L9.81624 7.46383L9.81476 7.47452L10.052 7.50732ZM5.33484 6.89648L5.344 6.8302L5.18873 6.80873C5.18873 6.80873 5.17799 6.83557 5.17276 6.84792L5.33484 6.89648Z"
        fill="black"
      />
      <path
        d="M24.2169 19.8866C24.3909 19.7653 24.5693 19.6741 24.7502 19.6139C25.1881 19.5486 25.626 19.5056 26.0638 19.5131C26.3476 19.5131 26.6313 19.627 26.9475 19.6998C26.9159 20.2901 26.8599 20.8093 26.8686 21.3229C26.8774 21.8365 26.9475 22.3334 27 22.9553C26.7093 23.0095 26.4141 23.101 26.1181 23.1141C25.5717 23.1383 25.0243 23.1309 24.4779 23.1141C23.7273 23.0879 22.9768 23.0132 22.2263 23.0076C20.8645 23.0076 19.5028 22.9815 18.1418 23.0599C17.2171 23.1122 16.2958 23.3849 15.371 23.4447C14.4296 23.5044 13.4864 23.3998 12.545 23.4073C11.3504 23.4073 10.1559 23.4615 8.96142 23.4932C7.63455 23.5367 6.30799 23.3712 4.99254 22.9983C4.90611 22.9752 4.82042 22.9409 4.73595 22.8955C4.09228 22.5444 4.04674 22.4249 4.00295 21.0091C3.98106 20.2919 4.07739 19.9202 4.41018 19.8156C4.79833 19.6949 5.19077 19.6487 5.58279 19.6774C6.67485 19.7503 7.76515 19.9165 8.8572 19.9688C10.6341 20.051 12.4119 20.1107 14.1896 20.1033C15.1197 20.1033 16.0497 19.9314 16.9789 19.8399C18.1418 19.7241 19.3043 19.6108 20.4661 19.5C20.9355 19.8586 21.4478 19.5093 21.9032 19.8287C22.1414 19.995 22.236 19.4552 22.4558 19.6419C22.6152 19.7839 22.828 19.6419 23.0171 19.6419C23.3674 19.6419 23.7116 19.6326 24.0584 19.6662C24.1241 19.6718 24.1915 19.8511 24.2169 19.8866ZM22.969 22.5201C23.0679 22.6266 23.1275 22.7461 23.1853 22.7405C23.2728 22.7405 23.3604 22.593 23.4524 22.5892C23.9069 22.5724 24.3623 22.5892 24.8176 22.5892C24.5278 22.3651 24.1897 22.7443 23.9603 22.1111C23.702 22.8451 23.3289 22.2493 22.969 22.5201ZM20.7034 21.9318V21.971H22.0363V21.9318H20.7034Z"
        fill="black"
      />
    </symbol>
  );
};

export default Hamburger;