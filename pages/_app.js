import React from "react";

import "styles/scss/nextjs-material-kit.scss?v=1.2.0";
import {Provider} from "next-auth/client";

export default function App({ Component, pageProps }) {
    return (
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    );
}
