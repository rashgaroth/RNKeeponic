import * as React from "react"
import { StyleSheet } from "react-native"
import { Searchbar } from 'react-native-paper'

const KpnSearchBar = ({icon, ...props}) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Searchbar
            placeholder="Bibit kangkung, Rockwool, ..."
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBar}
            icon={icon || null}
            {...props}
        />
    );
};

const styles = StyleSheet.create({

    searchBar:{
        marginHorizontal: 50,
        marginVertical: 10,
    }

})

export default KpnSearchBar;