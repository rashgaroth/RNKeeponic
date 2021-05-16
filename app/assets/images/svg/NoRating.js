import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { COLORS } from "../../../utils/colors"

function NoRating(props, { width, height }) {
    return (
        <Svg width={width || 9} height={height || 9} viewBox="0 0 9 9" fill="none" {...props}>
            <Path
                d="M4.5 7.5l2.182 1.375c.4.252.89-.12.784-.591l-.578-2.585 1.93-1.741c.352-.318.163-.92-.3-.958l-2.54-.225L4.984.333a.518.518 0 00-.968 0L3.022 2.77l-2.54.224c-.463.038-.652.64-.3.958l1.93 1.742-.578 2.584c-.105.471.384.844.784.592L4.5 7.5z"
                fill={COLORS.colorC4}
            />
        </Svg>
    )
}

export default NoRating