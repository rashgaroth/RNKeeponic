import * as React from "react"
import Svg, {
    Defs,
    LinearGradient,
    Stop,
    Path,
    Circle,
    Ellipse,
    G,
    Rect
} from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            data-name="Layer 1"
            width={400}
            height={200}
            viewBox="0 0 868 731"
            {...props}
        >
            <Defs>
                <LinearGradient
                    id="a"
                    x1={731.5}
                    y1={630}
                    x2={731.5}
                    y2={105}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop offset={0} stopColor="gray" stopOpacity={0.25} />
                    <Stop offset={0.54} stopColor="gray" stopOpacity={0.12} />
                    <Stop offset={1} stopColor="gray" stopOpacity={0.1} />
                </LinearGradient>
                <LinearGradient
                    id="c"
                    x1={136.5}
                    y1={632}
                    x2={136.5}
                    y2={107}
                    xlinkHref="#a"
                />
                <LinearGradient
                    id="b"
                    x1={136.5}
                    y1={190}
                    x2={136.5}
                    y2={159}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop offset={0} stopOpacity={0.12} />
                    <Stop offset={0.55} stopOpacity={0.09} />
                    <Stop offset={1} stopOpacity={0.02} />
                </LinearGradient>
                <LinearGradient
                    id="d"
                    x1={732.5}
                    y1={237}
                    x2={732.5}
                    y2={206}
                    xlinkHref="#b"
                />
                <LinearGradient
                    id="e"
                    x1={731.5}
                    y1={285}
                    x2={731.5}
                    y2={254}
                    xlinkHref="#b"
                />
                <LinearGradient
                    id="f"
                    x1={731.5}
                    y1={333}
                    x2={731.5}
                    y2={302}
                    xlinkHref="#b"
                />
                <LinearGradient
                    id="g"
                    x1={731.5}
                    y1={381}
                    x2={731.5}
                    y2={350}
                    xlinkHref="#b"
                />
                <LinearGradient
                    id="h"
                    x1={731.5}
                    y1={429}
                    x2={731.5}
                    y2={398}
                    xlinkHref="#b"
                />
                <LinearGradient
                    id="i"
                    x1={731.5}
                    y1={477}
                    x2={731.5}
                    y2={446}
                    xlinkHref="#b"
                />
                <LinearGradient
                    id="j"
                    x1={731.5}
                    y1={525}
                    x2={731.5}
                    y2={494}
                    xlinkHref="#b"
                />
                <LinearGradient
                    id="k"
                    x1={731.5}
                    y1={573}
                    x2={731.5}
                    y2={542}
                    xlinkHref="#b"
                />
                <LinearGradient id="l" x1={731.5} x2={731.5} xlinkHref="#b" />
                <LinearGradient
                    id="m"
                    x1={51}
                    y1={223.5}
                    x2={222}
                    y2={223.5}
                    xlinkHref="#b"
                />
                <LinearGradient
                    id="n"
                    x1={51}
                    y1={270.5}
                    x2={222}
                    y2={270.5}
                    xlinkHref="#b"
                />
                <LinearGradient
                    id="o"
                    x1={51}
                    y1={317.5}
                    x2={222}
                    y2={317.5}
                    xlinkHref="#b"
                />
                <LinearGradient
                    id="p"
                    x1={51}
                    y1={365.5}
                    x2={222}
                    y2={365.5}
                    xlinkHref="#b"
                />
                <LinearGradient
                    id="q"
                    x1={51}
                    y1={413.5}
                    x2={222}
                    y2={413.5}
                    xlinkHref="#b"
                />
                <LinearGradient
                    id="r"
                    x1={51}
                    y1={461.5}
                    x2={222}
                    y2={461.5}
                    xlinkHref="#b"
                />
                <LinearGradient
                    id="s"
                    x1={132}
                    y1={664}
                    x2={735}
                    y2={664}
                    xlinkHref="#a"
                />
                <LinearGradient
                    id="t"
                    x1={435}
                    y1={89}
                    x2={435}
                    y2={50}
                    xlinkHref="#a"
                />
                <LinearGradient
                    id="u"
                    x1={601}
                    y1={704.8}
                    x2={601}
                    y2={406}
                    xlinkHref="#a"
                />
            </Defs>
            <Path fill="#90b380" opacity={0.2} d="M69 0H800V731H69z" />
            <Path fill="#90b380" opacity={0.5} d="M179 68.25H689V663.75H179z" />
            <Path fill="url(#a)" d="M595 105H868V630H595z" />
            <Path fill="url(#c)" d="M0 107H273V632H0z" />
            <Path fill="#90b380" d="M604 113H859V619H604z" />
            <Path
                transform="rotate(-180 219.5 408.25)"
                fill="#90b380"
                d="M175 197.5H430V703.5H175z"
            />
            <Path fill="url(#b)" d="M51 159H222V190H51z" />
            <Path fill="url(#d)" d="M647 206H818V237H647z" />
            <Path fill="url(#e)" d="M646 254H817V285H646z" />
            <Path fill="url(#f)" d="M646 302H817V333H646z" />
            <Path fill="url(#g)" d="M646 350H817V381H646z" />
            <Path fill="url(#h)" d="M646 398H817V429H646z" />
            <Path fill="url(#i)" d="M646 446H817V477H646z" />
            <Path fill="url(#j)" d="M646 494H817V525H646z" />
            <Path fill="url(#k)" d="M646 542H817V573H646z" />
            <Path fill="url(#l)" d="M646 159H817V190H646z" />
            <Path fill="url(#m)" d="M51 208H222V239H51z" />
            <Path fill="url(#n)" d="M51 255H222V286H51z" />
            <Path fill="url(#o)" d="M51 302H222V333H51z" />
            <Path fill="url(#p)" d="M51 350H222V381H51z" />
            <Path fill="url(#q)" d="M51 398H222V429H51z" />
            <Path fill="#fff" d="M55 163H219V187H55z" />
            <Path fill="#fff" d="M54.5 210H218.5V234H54.5z" />
            <Path fill="#fff" d="M54.5 258H218.5V282H54.5z" />
            <Path fill="#fff" d="M54.5 306H218.5V330H54.5z" />
            <Path fill="#fff" d="M54.5 354H218.5V378H54.5z" />
            <Path fill="#fff" d="M54.5 402H218.5V426H54.5z" />
            <Path fill="url(#r)" d="M51 446H222V477H51z" />
            <Path fill="#fff" d="M54.5 450H218.5V474H54.5z" />
            <Path fill="#fff" d="M54.5 450H218.5V474H54.5z" />
            <Path fill="#fff" d="M54.5 498H218.5V522H54.5z" />
            <Path fill="#fff" d="M54.5 546H218.5V570H54.5z" />
            <Path fill="#fff" d="M650 162H814V186H650z" />
            <Path fill="#fff" d="M650 210H814V234H650z" />
            <Path fill="#fff" d="M650 258H814V282H650z" />
            <Path fill="#fff" d="M650 306H814V330H650z" />
            <Path fill="#fff" d="M650 354H814V378H650z" />
            <Path fill="#fff" d="M650 402H814V426H650z" />
            <Path fill="#fff" d="M650 450H814V474H650z" />
            <Path fill="#fff" d="M650 498H814V522H650z" />
            <Path fill="#fff" d="M650 546H814V570H650z" />
            <Path fill="url(#s)" d="M132 645H735V683H132z" />
            <Path fill="#90b380" d="M137 649H731V679H137z" />
            <Path fill="url(#t)" d="M134 50H736V89H134z" />
            <Path fill="#90b380" d="M137 53H731V83H137z" />
            <Path fill="#263238" opacity={0.5} d="M289 113H581V619H289z" />
            <Path
                d="M825.66 417.55c7 9.38-3.48 20.46-3.48 20.46l1.76.61c-2.59 2.87-12.82 15.82-52.26 74.4-50.5 75-118.55 93.71-118.55 93.71a84 84 0 00-27.73-14.31v-7.08a83 83 0 0055.3-53.48 85.08 85.08 0 009.14-38.44c0-48-39.77-86.94-88.82-86.94s-88.82 38.93-88.82 86.94a85.08 85.08 0 009.14 38.44 83 83 0 0055.3 53.48v7.08a84 84 0 00-27.73 14.31S480.83 588 430.33 513c-39.44-58.58-49.67-71.54-52.26-74.4l1.76-.61s-10.45-11.08-3.48-20.46-46.15-20.46-40.06 0 13.93 30.69 13.93 30.69 111.2 175.38 169.25 204.36a80.43 80.43 0 00-2.06 18.12v34.1h167.18v-34.1a80.43 80.43 0 00-2.06-18.12c58-29 169.25-204.35 169.25-204.35s7.84-10.23 13.93-30.69-47.02-9.37-40.05.01z"
                transform="translate(-166 -84.5)"
                fill="url(#u)"
            />
            <Circle cx={435} cy={413.47} r={85.06} fill="#263238" />
            <Circle cx={435} cy={426.82} r={80.06} fill="#f8c198" />
            <Circle cx={403.31} cy={409.3} r={10.01} fill="#263238" />
            <Circle cx={468.36} cy={409.3} r={10.01} fill="#263238" />
            <Path
                d="M624.35 548c0 6-10.45 15.85-23.35 15.85S577.65 554 577.65 548s10.45-5.84 23.35-5.84 23.35-.16 23.35 5.84z"
                transform="translate(-166 -84.5)"
                fill="#fff"
            />
            <Circle cx={405.81} cy={409.3} r={3.34} fill="#fff" />
            <Circle cx={471.69} cy={409.3} r={3.34} fill="#fff" />
            <Path
                d="M609 466.88c-4.88 0-9.26-4.24-9.78-9.09a12 12 0 017-11.75 3.42 3.42 0 011.47-.38c1.68 0 2.51 2 3.05 3.59 1.68 4.92 4.66 9.72 9.34 12s11.22 1.11 13.69-3.47c-6.62-2.95-9.45-12.21-5.6-18.35 1.49-2.37 3.81-4.38 4.28-7.14.86-5-4.62-8.64-9.47-10.14-14-4.33-62.8-4.81-65.49 16.08-2.82 22.04 36.14 31.57 51.51 28.65z"
                transform="translate(-166 -84.5)"
                fill="#263238"
            />
            <Ellipse
                cx={524.27}
                cy={512.15}
                rx={5}
                ry={14.18}
                transform="rotate(-21.53 219.11 906.482)"
                fill="#f8c198"
            />
            <Ellipse
                cx={677.73}
                cy={512.15}
                rx={14.18}
                ry={5}
                transform="rotate(-68.47 532.614 591.868)"
                fill="#f8c198"
            />
            <Path
                d="M650.91 608.84s65.17-18.3 113.54-91.69 50.87-73.59 50.87-73.59l25.85 10.21S721.09 647.25 669.39 657.26s-18.48-48.42-18.48-48.42z"
                transform="translate(-166 -84.5)"
                fill="#ff9800"
            />
            <Path
                d="M812.83 443.77s10-10.84 3.34-20 44.2-20 38.36 0-13.34 30-13.34 30z"
                transform="translate(-166 -84.5)"
                fill="#f8c198"
            />
            <Path
                d="M551.09 608.84s-65.17-18.3-113.54-91.69-50.87-73.59-50.87-73.59l-25.85 10.21s120.09 193.48 171.8 203.49 18.46-48.42 18.46-48.42z"
                transform="translate(-166 -84.5)"
                fill="#ff9800"
            />
            <Path
                d="M389.17 443.77s-10-10.84-3.34-20-44.2-20-38.36 0 13.34 30 13.34 30z"
                transform="translate(-166 -84.5)"
                fill="#f8c198"
            />
            <G opacity={0.2} fill="#fff">
                <Path
                    d="M628.29 427.27c-.48 2.76-2.8 4.76-4.28 7.14-3.37 5.38-1.62 13.16 3.32 17a12.79 12.79 0 01.85-11.14c1.49-2.37 3.81-4.38 4.28-7.14.54-3.13-1.41-5.73-4.13-7.6a6 6 0 01-.04 1.74zM607.46 446.51c-.32-.75-.62-1.51-.88-2.27-.54-1.59-1.37-3.54-3.05-3.59a3.42 3.42 0 00-1.47.38 12 12 0 00-7 11.75 10.53 10.53 0 004.47 7.35 9.4 9.4 0 01-.3-1.51 12 12 0 017-11.75 3.87 3.87 0 011.23-.36zM600.41 462.35c-12.16.51-31.78-4.13-41.45-14 7.22 15.36 37.05 21.79 50 19.32a10.08 10.08 0 01-8.55-5.32zM628.68 454.11c-2.92 3.43-8.58 4.15-12.75 2.12a14.54 14.54 0 01-3.7-2.61 17.84 17.84 0 007.87 8.44c4.68 2.27 11.22 1.11 13.69-3.47a11.88 11.88 0 01-5.11-4.48z"
                    transform="translate(-166 -84.5)"
                />
            </G>
            <Path
                d="M837.85 453.77S717.76 647.25 666 657.26a60.33 60.33 0 01-9.07 1.11 53.05 53.05 0 0012.41-1.11c51.71-10 171.8-203.49 171.8-203.49l-2.68-.95c-.37.63-.61.95-.61.95zM364.15 453.77S484.24 647.25 536 657.26a60.33 60.33 0 009.07 1.11 53.05 53.05 0 01-12.41-1.11c-51.71-10-171.8-203.49-171.8-203.49l2.68-.95c.37.63.61.95.61.95z"
                transform="translate(-166 -84.5)"
                fill="#fff"
                opacity={0.2}
            />
            <Path
                d="M435 506.88a80.06 80.06 0 0180.06 80.06v33.36H354.94v-33.36A80.06 80.06 0 01435 506.88z"
                fill="#ff9800"
            />
            <Path
                d="M601.83 591.8a80.93 80.93 0 00-8.72.47c1 0 1.91-.06 2.88-.06a80.06 80.06 0 0180.06 80.06v32.94h5.84v-33.35a80.06 80.06 0 00-80.06-80.06z"
                transform="translate(-166 -84.5)"
                fill="#fff"
                opacity={0.2}
            />
            <Path
                d="M600.17 591.8a80.93 80.93 0 018.72.47c-1 0-1.91-.06-2.88-.06a80.06 80.06 0 00-80.06 80.06v32.94h-5.84v-33.35a80.06 80.06 0 0180.06-80.06z"
                transform="translate(-166 -84.5)"
                fill="#fff"
                opacity={0.2}
            />
            <Rect
                x={411.65}
                y={484.78}
                width={46.7}
                height={56.29}
                rx={23.35}
                ry={23.35}
                fill="#f8c198"
            />
        </Svg>
    )
}

export default SvgComponent
