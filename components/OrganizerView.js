import React from 'react'
import {ScrollView,View,Text,TextInput,StyleSheet,ImageBackground,Image} from 'react-native'
import FadeInView from '../elements/FadeInView';
import {Button} from 'react-native-elements'
import FixedHeader from '../elements/FixedHeader'


class OrganizerView extends React.Component {
    
    constructor(props) {
        super(props)
        this.state ={
            name: ''
        }
    }

    render() {
        return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <FixedHeader/>
        <ImageBackground source={require('../assets/theme1.jpg')} style={{width: '100%', height: '100%'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontFamily:"Papyrus",color: '#fff',fontSize:30 }}>Welcome Organizer!</Text>
        <FadeInView style={{width: 250, height: 50,paddingTop:'1%', backgroundColor: 'powderblue', borderRadius: '10'}}>
        <Button 
         title="Create Quest" 
         type="clear"
         onPress={() => this.props.navigation.navigate('CreateQuest')}
         titleStyle={{fontFamily: "Papyrus", color: '#562547'}}/>   
        </FadeInView>
        <FadeInView style={{width: 250, height: 50,paddingTop:'1%', marginTop: '2%', backgroundColor: 'powderblue', borderRadius: '10'}}>
        <Button 
        title="Create Team" 
        onPress={() => this.props.navigation.navigate('CreateTeam')}
        type="clear"
         titleStyle={{fontFamily: "Papyrus", color: '#562547'}} />   
        </FadeInView>
        </View>       
        </ImageBackground>
      </View>
        )
    }
}
export default OrganizerView