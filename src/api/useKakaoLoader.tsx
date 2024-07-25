import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: "2b4a9f4145628dbbcc4131ea4757f926",
    libraries: ["clusterer", "drawing", "services"],
  })
}