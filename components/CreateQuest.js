import React from 'react'
import FixedHeader from '../elements/FixedHeader';
import { ScrollView, View, Text, TextInput, ImageBackground,TouchableOpacity} from 'react-native'
import { Card, Button } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown';
import FadeInView from '../elements/FadeInView';

class CreateQuest extends React.Component {
    
    constructor(props) {
        super(props)
        this.state ={
            name: '',
            numberOfPlayers: 2,
            timeLimit: 0,
            error: '',
            timeLimitError: '',
            numberOfTeams: 2
        }
    }

    updateForm(newState) {
      console.log('newState ', newState);
      if(this.state.name == ''){
        this.setState({
          error: 'Please enter a quest name'
        });
      } else {
        this.setState({
          newState
        });
      }  
    }

    setTimeLimit(timeLimit){
      this.setState({ 
        timeLimitError: ''});
      let tl = timeLimit.trim()
      let isValid = /^\d*$/.test(tl) && (tl === "" || parseInt(tl) <= 360)
      if(isValid){
        this.setState({
          timeLimit: tl, 
          timeLimitError: ''});
      }  else if(tl == ''){
        this.setState({ 
          timeLimitError: 'Time limit should not be empty'});
      } else if(parseInt(tl) > 360){
        this.setState({ 
          timeLimitError: 'Time limit should not exceed 360 mins'});
      } else if(parseInt(tl) < 30){
        this.setState({ 
          timeLimitError: 'Time limit should be at least 30 mins'});
      } else {
        this.setState({ 
          timeLimitError: 'Time limit should be numeric'});
      }
      
    }

    createQuest(){
        let name = this.state.name.trim()
        let tl = this.state.timeLimit;
        let isValid = /^\d*$/.test(tl) && (tl === "" || parseInt(tl) <= 360)
        if(name == ''){
          this.setState({
            error: 'Please enter a quest name'
          });
        } else if(tl == 0) {
          this.setState({
            timeLimitError: 'Time limit should not be less than 30 mins'
          });
        } else if(tl == ''){
          this.setState({ 
            timeLimitError: 'Time limit should not be empty'});
        } else if(parseInt(tl) > 360){
          this.setState({ 
            timeLimitError: 'Time limit should not exceed 360 mins'});
        } else if(parseInt(tl) < 30){
          this.setState({ 
            timeLimitError: 'Time limit should be at least 30 mins'});
        } else if(!isValid){
          this.setState({ 
            timeLimitError: 'Time limit should be numeric'});
        } else {
          this.setState({
            error: '',
            timeLimit: tl,
            timeLimitError: ''
          });
          fetch("https://mighty-dusk-79530.herokuapp.com/api/users")
            .then(res => res.json())
            .then(name => console.log('I am ', name[0].username, '!'));
          fetch('https://mighty-dusk-79530.herokuapp.com/api/questDetails', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.name,
                    numberOfPlayers: this.state.numberOfPlayers,
                    timeLimit: this.state.timeLimit
                }),
              }).then((response) => response.json())
                  .then((responseJson) => {
                    console.log('Name: ', responseJson.name);
                    console.log('Number of players: ', responseJson.numberOfPlayers);
                    console.log('Time Limit: ', responseJson.timeLimit);
                  })
                  .catch((error) => {
                    console.error(error);
                  });
          this.props.navigation.navigate('ListClues');
        }
    }

    render() {
      var numberOfTeams = [{
        value: 2,
      }, {
        value: 3,
      }, {
        value: 4,
      }, {
        value: 5,
      }, {
        value: 6,
      }, {
        value: 7,
      }, {
        value: 8,
      }, {
        value: 9,
      }, {
        value: 10,
      }];
        var timeLimit = [{
            value: 30,
          }, {
            value: 60,
          }, {
            value: 90,
          }, {
            value: 120,
          }];
        let numberOfPlayers = [{
            value: 2,
          }, {
            value: 3,
          }, {
            value: 4,
          },{
            value: 5,
          }, {
            value: 7,
          }, {
            value: 8,
          }];
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <FixedHeader marginTop={60}/>
            <ImageBackground source={require('../assets/theme1.jpg')} style={{width: '100%', height: '100%'}}>
            <ScrollView>
            <Card 
            title="Create Quest" titleStyle={{fontSize: 20,fontFamily:"Papyrus",color:'#562547',paddingBottom:20}} 
            containerStyle={{marginTop:30,paddingTop:20, marginBottom:90}}>
               <Text style={{fontFamily:"Papyrus", fontSize:18, color:'#562547'}}>Quest Name</Text>
               <TextInput style= {{height:26,fontSize: 15, color: '#000', borderBottomWidth:1, 
                    borderBottomColor:'#555' }} value={this.state.name} placeholder={'eg. Quest 1'}
                    onChangeText={text => this.setState({name: text, error: ''})}/>
               <Text style={{color:'#ff0000'}}>{this.state.error}</Text>
               <Text style={{paddingTop:15, fontFamily:"Papyrus", fontSize:18, color:'#562547'}}>
               Number of Players in each team</Text>
               <Dropdown
                    selectedItemColor={'green'}
                    onChangeText={text => this.setState({numberOfPlayers : text})}
                    value={this.state.numberOfPlayers}
                    data={numberOfPlayers}
                />
                <Text style={{paddingTop:15, fontFamily:"Papyrus", fontSize:18, color:'#562547'}}>
                Number of Teams</Text>
               <Dropdown
                    selectedItemColor={'green'}
                    onChangeText={text => this.setState({numberOfTeams : text})}
                    value={this.state.numberOfTeams}
                    data={numberOfTeams}
                />
                <Text style={{paddingTop:15, fontFamily:"Papyrus", fontSize:18, color:'#562547'}}>
                Time Limit for the quest (in mins less than 360)</Text>
                <TextInput style= {{height:26, fontSize: 15, color: '#000', borderBottomWidth:1, 
                    borderBottomColor:'#555' }} value={this.state.timeLimit.toString()} placeholder={'eg. 30'}
                    onChangeText={text => this.setTimeLimit(text)}
                    maxLength={3}
                    keyboardType={'numeric'}/>
                <Text style={{color:'#ff0000'}}>{this.state.timeLimitError}</Text>
                <TouchableOpacity onPress={() => this.createQuest()}>
                <FadeInView style={{width: 305, height: 50,paddingTop:'1%', backgroundColor: 'powderblue', 
                borderRadius: '10', alignItems:'center', marginTop:20, alignSelf: "center"}}>
                <Button 
                    title="Next" 
                    type="clear"
                    onPress={() => this.createQuest()}
                    titleStyle={{fontFamily: "Papyrus", color: '#562547'}}/>   
                </FadeInView>
                </TouchableOpacity>
            </Card>
            </ScrollView>
            </ImageBackground>
            </View>
        )
    }
}
export default CreateQuest
