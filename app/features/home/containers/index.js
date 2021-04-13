import React, {useState} from 'react';
import { View, StatusBar, ScrollView, Text, TouchableOpacity, FlatList } from 'react-native';
import { Button, IconButton } from 'react-native-paper';

import { useDispatch } from 'react-redux';
import * as loginActions from 'app/features/login/actions';
import styles from './styles';

import { COLORS } from "../../../utils/colors";
import { KpnWideCard, KpnDivider, KpnCardProducts, KpnLifeStyleCard } from "../../../components";
import LogoRounded from "../../../assets/images/svg/LogoRounded";
import { navigationRef } from "../../../navigation/NavigationService";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(loginActions.logOut());
  const [selectedId, setSelectedId] = useState(null);

  const menu = {
    title: [
      "Keranjang Belanja",
      "Notifikasi",
      "Atur",
      "Disukai",
      "Paket"
    ],
    icons: [
      ["cart-outline", "Keranjang Belanja"],
      ["bell-outline", "Notifikasi"],
      ["heart-outline", "Disukai"],
      ["package-variant-closed", "Paket"],
    ]
  }

  const flatListData = [
    {
      id: 1,
      name: "Hidroponik berharga mehoong sekali...",
      rating: 3,
      price: "21.000",
      image: "https://images.pexels.com/photos/7267618/pexels-photo-7267618.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
      id: 2,
      name: "Hidroponik dengan keaslian ....",
      rating: 2,
      price: "30.000",
      image: "https://images.pexels.com/photos/1418893/pexels-photo-1418893.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
      id: 3,
      name: "Hidroponik beda beematna ....",
      rating: 5,
      price: "19.000",
      image: "https://images.pexels.com/photos/7301521/pexels-photo-7301521.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
      id: 4,
      name: "Hidroponik dengan makna yang ...",
      rating: 4,
      price: "19.000",
      image: "https://images.pexels.com/photos/2106707/pexels-photo-2106707.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
      id: 5,
      name: "KEeponic dengan keaslian ....",
      rating: 1,
      price: "191.000",
      image: "https://images.pexels.com/photos/2569206/pexels-photo-2569206.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
  ]

  const flatListWideView = [
    {
      id: 1,
      name: "Hidroponik berharga mehoong sekali...",
      image: "https://images.pexels.com/photos/7267618/pexels-photo-7267618.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      text: "ini menyenangkan, banyak anak .."
    },
    {
      id: 2,
      name: "Product2",
      image: "https://images.pexels.com/photos/1418893/pexels-photo-1418893.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      text: "ini menyenangkan, banyak anak .."
    },
    {
      id: 3,
      name: "Product3",
      image: "https://images.pexels.com/photos/7301521/pexels-photo-7301521.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      text: "ini menyenangkan, banyak anak .."
    },
  ]

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={COLORS.sans} />
      <View style={styles.searchView}>
        <Text style={styles.address}>Kosan Mandar</Text>
        <Button icon="chevron-down" style={styles.buttonDown} color={COLORS.white}/>
        {/* LOGO */}
        <LogoRounded style={styles.logo} width={30} height={40} />
      </View>
      <View>
        <Text style={styles.textMenuButton}>Selamat datang, John Doe!</Text>
        <View style={styles.menuButton}>
          {menu.icons.map((a, b)=> (
            <TouchableOpacity key={b} onPress={ navigationRef.current?.navigate("Notification") }>
            <View>
              <KpnDivider 
              style={styles.dividerMenuButton} 
              height={65}
              width={65}
              radius={10}
              />
              <IconButton icon={a[0]} style={styles.iconMenuButton} size={40} color={COLORS.white} />
              <Text style={
                a[1] === "Keranjang Belanja" ? {
                position: 'absolute',
                alignSelf: "flex-end",
                textAlign: "center",
                top: 85,
                left: 12,
                color: COLORS.fontColor,} 
                  : a[1] === "Notifikasi" ? {
                    position: 'absolute',
                    alignSelf: "flex-end",
                    textAlign: "center",
                    top: 85,
                    left: 12,
                    color: COLORS.fontColor,
                  } : styles.textMenuButtonInside}>{a[1]}</Text>
            </View>
            </TouchableOpacity>
            ))}
        </View>
        <View style={styles.textMenuHidroponik}>
          <Text style={styles.textPaketHidroponik}>Paket Hidroponik</Text>
          <TouchableOpacity>
            <Text style={styles.textLihatSemua}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.textLebihHemat}>Belanja lebih hemat dengan paket Hidroponik</Text>
        <View style={styles.cardProducts}>
          <FlatList  
          horizontal
          data={flatListData}
          renderItem={({ item }) => (
              <KpnCardProducts 
              rating={item.rating} 
              title={item.name} 
              image={item.image}
              />
          ) }
          keyExtractor={ (item) => item.id }
          extraData={selectedId}
          />
        </View>
        <View style={styles.textMenuHidroponik}>
          <Text style={styles.textPaketHidroponik}>Gaya Hidup & Kreativitas</Text>
          <TouchableOpacity>
            <Text style={styles.textLihatSemua}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardLifestyle}>
          <View style={styles.cardLifestyle1}>
              <KpnLifeStyleCard />
              <KpnLifeStyleCard />
          </View>
          <View style={styles.cardLifestyle2}>
              <KpnLifeStyleCard />
              <KpnLifeStyleCard />
          </View>
        </View>
        <View style={styles.textMenuHidroponik}>
          <Text style={styles.textPaketHidroponik}>Khusus Untuk John Doe</Text>
          <TouchableOpacity>
            <Text style={styles.textLihatSemua}>Lihat Semua</Text>
          </TouchableOpacity>
          <Text style={styles.textLebihHemat}>Barang yang direkomendasikan untuk anda!</Text>
        </View>
        {/* Flatlist untuk rekomendasi */}
        <View style={styles.cardProducts}>
          <FlatList
            horizontal
            data={flatListData}
            renderItem={({ item }) => (
              <KpnCardProducts
                rating={item.rating}
                title={item.name}
              />
            )}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        </View>
        <View style={styles.textMenuHidroponik}>
          <Text style={styles.textPaketHidroponik}>Inspirasi & Edukasi</Text>
          <TouchableOpacity>
            <Text style={styles.textLihatSemua}>Lihat Semua</Text>
          </TouchableOpacity>
          <Text style={styles.textLebihHemat}>Ide Hidroponik yang menginspirasi anda!</Text>
        </View>
        <View style={styles.wideCards}>
          {/* <KpnWideCard /> */}
          {/* FlatList Inspirasi */}
          <View style={styles.cardProducts}>
            <FlatList
              horizontal
              data={flatListWideView}
              renderItem={({ item }) => (
                <KpnWideCard
                  title={item.name}
                  image={item.image}
                  paragraph={item.text}
                />
              )}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
            />
          </View>
        </View>
        <View style={styles.textMenuHidroponik}>
          <Text style={styles.textPaketHidroponik}>Terdekat dari rumah anda</Text>
          <TouchableOpacity>
            <Text style={styles.textLihatSemua}>Lihat Semua</Text>
          </TouchableOpacity>
          <Text style={styles.textLebihHemat}>Malas menunggu? Ini Solusinya!</Text>
        </View>
        {/* Flatlist untuk terdekat */}
        <View style={styles.cardProducts}>
          <FlatList
            horizontal
            data={flatListData}
            renderItem={({ item }) => (
              <KpnCardProducts
                rating={item.rating}
                title={item.name}
              />
            )}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        </View>
      </View>
    </ScrollView>
  );
}
