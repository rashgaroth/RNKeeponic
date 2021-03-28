import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props, {height, width}) {
  return (
    <Svg width={height || 158} height={width || 54} viewBox="0 0 158 54" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.214 17.46C.074 18.286 0 19.134 0 20v13c0 2.815.775 5.45 2.124 7.7H3.42c6.418 0 11.62-5.203 11.62-11.62 0-6.417-5.202-11.62-11.62-11.62H.214zm4.237 26.204A14.952 14.952 0 0015 48h11c2.063 0 4.03-.417 5.818-1.17-.843-.568-2.029-1.214-3.252-1.881-1.862-1.015-3.811-2.078-4.78-2.986-1.744-1.636-3.239-6.086-3.488-8.448 2.042 1.009 5.861 3.504 7.85 5.581-2.671-3.409-6.94-7.761-9.095-7.761-.483 0-.87-.058-1.162-.161-.968 6.749-6.545 12.01-13.44 12.49zM41 33c0 6.018-3.544 11.208-8.659 13.598 1.923-12.597-4.545-14.9-5.512-15.243l-.055-.02c-.217-.08-.963-.113-1.88-.153-2.231-.1-5.478-.244-4.595-1.21.996-1.09 4.732-1.18 6.475-1.09C37.818 27.04 37.468 14.576 36.4 9.191A14.956 14.956 0 0141 20v13zM26 5c3.242 0 6.245 1.029 8.698 2.778-.612.48-1.526.989-2.625 1.6-1.913 1.063-4.385 2.437-6.793 4.517-3.786 3.27-4.4 8.447-4.234 10.627 3.188 0 8.8-5.813 11.208-8.72-1.826 3.27-6.476 10.137-10.461 11.445-1.758.577-3.009 1.256-3.753 1.893v-.06c0-8.074-6.546-14.62-14.62-14.62H1.056C3.26 8.918 8.673 5 15 5h11zM6.56 29.08c1.811 0 3.28-1.54 3.28-3.44S8.371 22.2 6.56 22.2c-1.811 0-3.28 1.54-3.28 3.44s1.469 3.44 3.28 3.44z"
        fill="#61934A"
      />
      <Path
        d="M57.112 35.5l-6.096-7.464V35.5h-3.36V18.748h3.36v7.512l6.096-7.512h4.056l-6.912 8.304L61.36 35.5h-4.248zm17.018-6.936c0 .48-.032.912-.096 1.296h-9.72c.08.96.416 1.712 1.008 2.256.592.544 1.32.816 2.184.816 1.248 0 2.136-.536 2.664-1.608h3.624c-.384 1.28-1.12 2.336-2.208 3.168-1.088.816-2.424 1.224-4.008 1.224-1.28 0-2.432-.28-3.456-.84a6.182 6.182 0 01-2.376-2.424c-.56-1.04-.84-2.24-.84-3.6 0-1.376.28-2.584.84-3.624a5.861 5.861 0 012.352-2.4c1.008-.56 2.168-.84 3.48-.84 1.264 0 2.392.272 3.384.816a5.63 5.63 0 012.328 2.328c.56.992.84 2.136.84 3.432zm-3.48-.96c-.016-.864-.328-1.552-.936-2.064-.608-.528-1.352-.792-2.232-.792-.832 0-1.536.256-2.112.768-.56.496-.904 1.192-1.032 2.088h6.312zm16.493.96c0 .48-.032.912-.096 1.296h-9.72c.08.96.416 1.712 1.008 2.256.592.544 1.32.816 2.184.816 1.248 0 2.136-.536 2.664-1.608h3.624c-.384 1.28-1.12 2.336-2.208 3.168-1.088.816-2.424 1.224-4.008 1.224-1.28 0-2.432-.28-3.456-.84a6.182 6.182 0 01-2.376-2.424c-.56-1.04-.84-2.24-.84-3.6 0-1.376.28-2.584.84-3.624a5.861 5.861 0 012.352-2.4c1.008-.56 2.168-.84 3.48-.84 1.264 0 2.392.272 3.384.816a5.63 5.63 0 012.328 2.328c.56.992.84 2.136.84 3.432zm-3.48-.96c-.016-.864-.328-1.552-.936-2.064-.608-.528-1.352-.792-2.232-.792-.832 0-1.536.256-2.112.768-.56.496-.904 1.192-1.032 2.088h6.312zm7.492-3.48c.432-.608 1.024-1.112 1.776-1.512.768-.416 1.64-.624 2.616-.624 1.136 0 2.16.28 3.072.84.928.56 1.656 1.36 2.184 2.4.544 1.024.816 2.216.816 3.576 0 1.36-.272 2.568-.816 3.624-.528 1.04-1.256 1.848-2.184 2.424-.912.576-1.936.864-3.072.864-.976 0-1.84-.2-2.592-.6a5.571 5.571 0 01-1.8-1.512v8.232h-3.36V22.204h3.36v1.92zm7.032 4.68c0-.8-.168-1.488-.504-2.064-.32-.592-.752-1.04-1.296-1.344a3.403 3.403 0 00-1.728-.456c-.608 0-1.184.16-1.728.48-.528.304-.96.752-1.296 1.344-.32.592-.48 1.288-.48 2.088s.16 1.496.48 2.088c.336.592.768 1.048 1.296 1.368a3.49 3.49 0 001.728.456c.624 0 1.2-.16 1.728-.48a3.45 3.45 0 001.296-1.368c.336-.592.504-1.296.504-2.112zm9.978 6.912c-1.28 0-2.432-.28-3.456-.84a6.301 6.301 0 01-2.424-2.424c-.576-1.04-.864-2.24-.864-3.6 0-1.36.296-2.56.888-3.6a6.253 6.253 0 012.472-2.4c1.04-.576 2.2-.864 3.48-.864 1.28 0 2.44.288 3.48.864a6.091 6.091 0 012.448 2.4c.608 1.04.912 2.24.912 3.6 0 1.36-.312 2.56-.936 3.6a6.377 6.377 0 01-2.496 2.424c-1.04.56-2.208.84-3.504.84zm0-2.928c.608 0 1.176-.144 1.704-.432.544-.304.976-.752 1.296-1.344.32-.592.48-1.312.48-2.16 0-1.264-.336-2.232-1.008-2.904-.656-.688-1.464-1.032-2.424-1.032s-1.768.344-2.424 1.032c-.64.672-.96 1.64-.96 2.904s.312 2.24.936 2.928c.64.672 1.44 1.008 2.4 1.008zm14.968-10.776c1.584 0 2.864.504 3.84 1.512.976.992 1.464 2.384 1.464 4.176v7.8h-3.36v-7.344c0-1.056-.264-1.864-.792-2.424-.528-.576-1.248-.864-2.16-.864-.928 0-1.664.288-2.208.864-.528.56-.792 1.368-.792 2.424V35.5h-3.36V22.204h3.36v1.656a4.555 4.555 0 011.704-1.344 5.28 5.28 0 012.304-.504zm8.404-1.392c-.592 0-1.088-.184-1.488-.552a1.925 1.925 0 01-.576-1.416c0-.56.192-1.024.576-1.392.4-.384.896-.576 1.488-.576s1.08.192 1.464.576c.4.368.6.832.6 1.392 0 .56-.2 1.032-.6 1.416-.384.368-.872.552-1.464.552zm1.656 1.584V35.5h-3.36V22.204h3.36zm.655 6.648c0-1.376.28-2.576.84-3.6.56-1.04 1.336-1.84 2.328-2.4.992-.576 2.128-.864 3.408-.864 1.648 0 3.008.416 4.08 1.248 1.088.816 1.816 1.968 2.184 3.456h-3.624c-.192-.576-.52-1.024-.984-1.344-.448-.336-1.008-.504-1.68-.504-.96 0-1.72.352-2.28 1.056-.56.688-.84 1.672-.84 2.952 0 1.264.28 2.248.84 2.952.56.688 1.32 1.032 2.28 1.032 1.36 0 2.248-.608 2.664-1.824h3.624c-.368 1.44-1.096 2.584-2.184 3.432-1.088.848-2.448 1.272-4.08 1.272-1.28 0-2.416-.28-3.408-.84a6.108 6.108 0 01-2.328-2.4c-.56-1.04-.84-2.248-.84-3.624z"
        fill="#61934A"
      />
    </Svg>
  )
}

export default SvgComponent
