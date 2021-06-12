import { 
  LayoutAnimation,
  Animated, 
  Dimensions, 
  Text, 
  View, 
  StyleSheet, 
  ScrollView, 
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { IconButton, Avatar  } from "react-native-paper";
import { SharedElement } from 'react-navigation-shared-element';
import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from "react-redux";

import { COLORS } from "../../../utils/colors";
var { height, width } = Dimensions.get('window');
import LogoRounded from "../../../assets/images/svg/LogoRounded";
import { navigationRef, goBack, navigate } from "../../../navigation/NavigationService";
import HydroponicHand from "../../../assets/images/svg/HydroponicHand";
import { KpnWideCard } from "../../../components";
import { IHome } from "../../interfaces";
import { ITEM_WIDTH, SPACING } from "../../../utils/theme";
import { truncate } from '../../../utils/stringUtils';

const smallSize = width / 5;
const itemWidth = width * .67;
const itemHeight = height / 2 - 10 * 2;
const fontSize = 300;

const COLORS_LIFESTYLE = ['coral', 'mediumturquoise', 'palevioletred', 'papayawhip', 'tomato']
const ITEMS = [
  'https://s-media-cache-ak0.pinimg.com/564x/1d/00/9d/1d009d53dd993bd0a604397e65bbde6d.jpg',
  'https://s-media-cache-ak0.pinimg.com/564x/53/9d/bb/539dbb7cc07c677925627c6e91585ef5.jpg',
  'https://s-media-cache-ak0.pinimg.com/564x/3d/0b/a6/3d0ba6600a33f3e4b3bac737e024d720.jpg',
  'https://s-media-cache-ak0.pinimg.com/564x/d9/b8/27/d9b8276db7cd24443bc4a937f853914b.jpg',
  'https://s-media-cache-ak0.pinimg.com/564x/75/eb/53/75eb53941897f231cd0b55f25806d887.jpg',
  ''
]

const SMALL_ITEMS = [
  'https://s-media-cache-ak0.pinimg.com/564x/e3/44/6f/e3446f61632a9381c96362b45749c5f6.jpg',
  'https://s-media-cache-ak0.pinimg.com/236x/8e/e3/ef/8ee3efa5a843f2c79258e3f0684d306e.jpg',
  'https://s-media-cache-ak0.pinimg.com/236x/f1/1c/26/f11c26247021daeac5ec8c3aba1792d1.jpg',
  'https://s-media-cache-ak0.pinimg.com/236x/fa/5c/a9/fa5ca9074f962ef824e513aac4d59f1f.jpg',
  'https://s-media-cache-ak0.pinimg.com/236x/95/bb/e4/95bbe482ca9744ea71f68321ec4260a2.jpg',
  'https://s-media-cache-ak0.pinimg.com/564x/54/7d/13/547d1303000793176aca26505312089c.jpg',
  ''
]
const LOVERS_ITEMS = [
  {
    image: "http://3.bp.blogspot.com/-CJIsgAGspzM/VMMrxjonumI/AAAAAAAAACg/vE5S-hlVmog/s1600/PaulMcCartney.jpg",
    name: "Paul Mccartney",
    date: "20 menit yang lalu"
  },
  {
    image: "https://cdn-asset.jawapos.com/wp-content/uploads/2020/09/john-lennon-560x390.jpg",
    name: "John Lennon",
    date: "1 jam yang lalu"
  },
  {
    image: "https://imgs.smoothradio.com/images/98456?crop=16_9&width=660&relax=1&signature=igXP73-LBpG-A8QzT8LwlO2WjR0=",
    name: "Linda Mccartney",
    date: "7-12-2020"
  },
  {
    image: "https://asset-a.grid.id/crop/0x0:0x0/x/photo/2021/03/29/george-harrison-1024x585jpg-20210329083205.jpg",
    name: "George Harrison",
    date: "3-11-2020"
  },
  {
    image: "https://www.minews.id/wp-content/uploads/2020/07/ringo-starr.jpg",
    name: "Ringo Starr",
    date: "12-2-2020"
  },
  {
    image: "https://matamatamusik.com/wp-content/uploads/2020/05/Noel-Gallagher_2020.jpg",
    name: "Noel Gallagher",
    date: "2-1-2020"
  },
]

export default function App() {

  const [scrollX, setScrollX] = useState(new Animated.Value(0))
  const [indicator, setIndicator] = useState(new Animated.Value(1))

  const bottomSheetRef = useRef(null);
  const bottomSheetLoversRef = useRef(null);
  const snapPoints = useMemo(() => ["3%", "40%"], []);
  const snapPointsLovers = useMemo(() => [0, "40%"], []);

  const onPressLove = () => {
    bottomSheetRef.current.snapTo(0)
    bottomSheetLoversRef.current.snapTo(1)
  }

  useEffect(() => {
    LayoutAnimation.spring()
  }, [null])

  const renderRow = (image, i) => {
    let inputRange = [(i - 1) * itemWidth, i * itemWidth, (i + 1) * itemWidth, (i + 2) * itemWidth];
    let secondRange = [(i - 1) * itemWidth, i * itemWidth, (i + 1) * itemWidth]

    // Ensure that we're leaving space for latest item.
    if (image === '') {
      return <View key={i} style={[styles.emptyItem, { width: width * .33 }]}></View>
    }

    const onPressImage = async (image) => {
      navigate("ArticleDetail", { image })
    }

    return (
      <Animated.View key={i} style={[styles.emptyItem, {
        opacity: scrollX.interpolate({
          inputRange: secondRange,
          outputRange: [.3, 1, 1],
        }),
        height: scrollX.interpolate({
          inputRange: secondRange,
          outputRange: [itemHeight * .8, itemHeight, itemHeight],
        })
      }]}>
        <Text style={{ marginTop: 10, fontSize: 20, fontWeight: "bold"}}>Judul Artikel</Text>
        <View style={styles.lineView} />
        <View style={styles.chipGroup}>
          <TouchableOpacity style={styles.chip} onPress={() => onPressLove()}>
            <IconButton icon="heart" color={COLORS.red} size={15} style={styles.iconLove} />
            <Text style={{ justifyContent: 'center', alignSelf: "center", fontWeight: 'bold', color: COLORS.white }}>120</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconGroup}>
          <IconButton 
          icon="heart-outline"
          color={COLORS.white}
          style={{ backgroundColor: COLORS.colorC4 }}
          size={20}
          />
          <IconButton
            icon="share"
            color={COLORS.white}
            style={{ backgroundColor: COLORS.colorC4 }}
            size={20}
          />
        </View>
        <TouchableOpacity onPress={() => onPressImage(image)}>
          <SharedElement
            id={`item.${image}.article`}
            key={i}
          >
            {/* <SharedElement id={i}> */}
            <ImageBackground
              source={{ uri: image }}
              style={[StyleSheet.AbsoluteFill,
              {
                height: itemHeight - 50,
                width: itemWidth,
                opacity: 1,
                resizeMode: 'cover',
                borderRadius: 10,
              }]}>
              <View style={[StyleSheet.AbsoluteFill, { opacity: 0.4,  /*backgroundColor: COLORS_LIFESTYLE[i], */ width: itemWidth, height: itemHeight }]}></View>
              <Animated.View
                style={[{
                  width: itemWidth,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  flex: 1,
                  position: 'relative',
                  height: itemHeight,
                  opacity: scrollX.interpolate({
                    inputRange,
                    outputRange: [0.4, 1, 1, 1],
                  }),
                  transform: [{
                    scale: scrollX.interpolate({
                      inputRange,
                      outputRange: [.5, 1, 1.4, 1],
                    })
                  }]
                }]}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: itemWidth,
                    height: itemHeight,
                    position: 'absolute',
                    bottom: -itemHeight / 4,
                    right: -itemWidth / 4,
                    // borderRadius: 10,
                  }}>
                  {/* <Text style={{ fontSize: fontSize, color: 'rgba(0,0,0,0.4)' }}>{i + 1}</Text> */}
                </View>
              </Animated.View>
            </ImageBackground>
          </SharedElement>
          {/* </SharedElement> */}
        </TouchableOpacity>
      </Animated.View>
    );
  }

  const renderScroll = () => {
    return <Animated.ScrollView
      horizontal={true}
      style={{ flex: 1 }}
      contentContainerStyle={{ alignItems: 'center', flexGrow: 1, }}
      decelerationRate={0}
      snapToInterval={itemWidth}
      scrollEventThrottle={16}
      snapToAlignment="start"
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event(
        [
          { nativeEvent: { contentOffset: { x: scrollX } } }
        ],
        { useNativeDriver: false }
      )}
    >
      {ITEMS.map((image, i) => {
        return renderRow(image, i)
      })}
    </Animated.ScrollView>
  }

  const renderLovers = (i, image, name, date) => {
    return(
      <View key={i} style={{ width: width }}>
      <View key={i} style={styles.loversList}>
        <Avatar.Image 
        source={{ uri:image }}
        size={40}
        style={{ 
          marginVertical: 10
        }}
        />
        <View style={{ alignSelf: "center", marginLeft: 10 }}>
          <Text style={{ fontWeight: "bold" }}>{name}</Text>
          <Text style={{ fontSize: 10, color: COLORS.fontColor }}>{date}</Text>
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: COLORS.colorC4, width: 200, alignSelf: "center"}}/>
      </View>
    )
  }

  const renderNormal = (image, i) => {
    if (image === '') {
      return null
    }

    return <TouchableOpacity key={i} style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
      <ImageBackground source={{ uri: image }} style={[{ height: smallSize, width: smallSize, opacity: 1, resizeMode: 'cover' }]} />
      <View style={{ marginLeft: 20 }}>
        <Text style={{ fontWeight: '600', fontSize: 16 }}>Words of wisdom</Text>
        <Text style={{ fontWeight: '300', fontSize: 12 }}>We live in a world of deadlines</Text>
      </View>
    </TouchableOpacity>
  }

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleSheetLoversChanges = useCallback((index) => {
    console.log(index, "index")
    if(index == 0){
      bottomSheetRef.current.snapTo(1)
    }
  }, []);

  const homeState: IHome = useSelector(state => state.homeReducer);
  const wideData = homeState.dummyProducts.flatListWideView;

  useEffect(() => {
    bottomSheetRef.current.snapTo(1)
  }, [null])

  return (
    <>
      <View style={styles.searchView}>
        {/* <IconButton icon="keyboard-backspace" style={styles.buttonDown} color={COLORS.white} size={25} onPress={() => goBack()} /> */}
        {/* LOGO */}
        <Text style={[styles.heading, { fontSize: 20, color: COLORS.white, fontWeight: "bold" }]}>Artikel</Text>
        <LogoRounded style={styles.logo} width={30} height={40} />
      </View>
    <View style={styles.container}>
      <View style={{ height: height / 2 - 20, backgroundColor: COLORS.white }}>
        {renderScroll()}
      </View>
      <ScrollView style={{ backgroundColor: COLORS.white, width: width }}>
        {/* dwiyan */}
        <View style={styles.lineView} />
        <Text style={{ 
          fontWeight: "bold", 
          fontSize: 17, 
          marginHorizontal: 10
          }}> Gaya Hidup Hidroponik </Text>
        <Image 
        source={ require('../../../assets/images/png/petani.png') } 
        style={styles.imageFlatlist}
        resizeMode="contain"
        />
        <FlatList 
          horizontal
          data={wideData}
          snapToInterval={ITEM_WIDTH + SPACING * 1.6}
          contentContainerStyle={{
            paddingRight: width - ITEM_WIDTH - SPACING * 2,
          }}
          renderItem={({ item }) => (
            <KpnWideCard
              key={item.id}
              title={truncate(item.name, 30)}
              image={item.image}
              paragraph={item.text}
            />
          )}
          keyExtractor={(item) => item.id}
          onScrollEndDrag={(e) => console.log("End", e.nativeEvent.contentOffset.x)}
        />
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={styles.bottomSheet}
      >
          <Text style={styles.title}> Artikel Pilihan Untukmu ✔</Text>
          <BottomSheetScrollView contentContainerStyle={{ alignItems: 'flex-start' }} style={{ paddingHorizontal: 10, flex: 1, width: width }}>
              {SMALL_ITEMS.map((image, i) => {
                return renderNormal(image, i)
              })}
          </BottomSheetScrollView>
      </BottomSheet>
      <BottomSheet
        ref={bottomSheetLoversRef}
        index={0}
        snapPoints={snapPointsLovers}
        onChange={handleSheetLoversChanges}
        style={styles.bottomSheet}
      >
        <Text style={styles.title}> Pengguna yang menyukai</Text>
        <BottomSheetScrollView contentContainerStyle={{ alignItems: 'flex-start' }} style={{ paddingHorizontal: 10, flex: 1, width: width }}>
          {LOVERS_ITEMS.map((image, i) => {
            return renderLovers(i, image.image, image.name, image.date)
          })}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyItem: {
    overflow: 'hidden',
    height: itemHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 20,
    borderColor: 'white',
    width: itemWidth,
    backgroundColor: 'transparent',
    marginTop: 20
    // borderRadius: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: '300',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  searchView: {
    backgroundColor: COLORS.sans,
    height: 50,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  address: {
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.white,
    left: 10,
    top: 20
  },
  buttonDown: {
    color: COLORS.white,
    position: 'absolute',
    alignSelf: 'flex-start',
  },
  logo: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  containerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  contentContainer: {
    alignItems: 'center',
    width: width,
    paddingBottom: 30,
    height: '100%',
    maxHeight: 500,
    flex: 1
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  lineView: {
    height: 2,
    width: width - 30,
    backgroundColor: COLORS.colorC4,
    marginVertical: 10,
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  iconGroup: {
    position: 'absolute',
    zIndex: 100,
    top: 120,
    left: 0,
  },
  imageFlatlist: {
    position: 'absolute',
    alignSelf: 'flex-end',
    // height: 100,
    bottom: 0,
    transform: [{ rotateY: '180deg' }]
  }, 
  chipGroup: {
    position: 'absolute',
    zIndex: 100,
    top: 60,
    right: 0,
  },
  chip: {
    height: 30,
    width: 70,
    borderRadius: 17,
    marginRight: 5,
    marginTop: 5,
    backgroundColor: COLORS.colorC4,
    fontSize: 12,
    justifyContent: 'flex-start',
    opacity: 1,
    zIndex: 20,
    flexDirection: 'row',
  },
  iconLove: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  loversList: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 10
  }
});