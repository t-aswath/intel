import { Text, TouchableOpacity, View, ToastAndroid, ScrollView, Linking, KeyboardAvoidingView, TextInput, ActivityIndicator, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Entypo from '@expo/vector-icons/Entypo';
import { useCallback, useEffect, useState, useRef } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Location from 'expo-location';
import { Image } from 'expo-image';
import axios from "axios";
import {
  NotoSans_400Regular,
  NotoSans_300Light,
  useFonts
} from "@expo-google-fonts/noto-sans";
import {API_URL, BOT_PIC, BOT_URL, TOKEN} from './constants';
import simpArr from "./symptoms.json"
import mappedDoc from "./doctor-specilaise.json"

const App = () => {

    const [selectedDistance, setSelectedDistance] = useState("2");
    const [loading, setLoading] = useState(false)
    const [searching, setSearching] = useState(true)
    const [selectedSpecilization, setSelectedSpecialization] = useState("General")
    const [fetching, setFetching] = useState(false)
    const [chat, setChat] = useState(false)
    const [doctors, setDoctors] = useState([])
    const [clientCoords, setClientCoords] = useState({})

    let [fontsLoaded] = useFonts({
        NotoSans_400Regular,
        NotoSans_300Light
    });

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded)
      return null;

    const getLatLon = async () => {
        setLoading(true)
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            ToastAndroid.show('Location is needed to search Doctors near you!', ToastAndroid.SHORT);
        }else{
            const { coords } = await Location.getCurrentPositionAsync({});
            setClientCoords({"latitude": coords.latitude, "longitude": coords.longitude})
            if(selectedSpecilization === "Chat with AI") {
                setLoading(false)
                setSearching(false)
                setChat(true)
            } else {
                setLoading(false)
                setSearching(false)
                setFetching(true)
                try{
                    const {data} = await axios.post(API_URL+"doctor", {
                            "latitude" : coords.latitude,
                            "longitude" : coords.longitude,
                            "dist": selectedDistance
                        }
                    )
                    const selectedDoctors = (data.sort((a, b) => b.viable - a.viable).filter(item => (item.specialization.toLowerCase() === selectedSpecilization.toLowerCase())).length === 0) ? data.sort((a, b) => b.viable - a.viable) : data.sort((a, b) => b.viable - a.viable).filter(item => (item.specialization.toLowerCase() === selectedSpecilization.toLowerCase()))
                    setDoctors(selectedDoctors)
                } catch(err) {
                    console.log(err)
                    setDoctors([])
                }
                setFetching(false)
            }
        }
    }

    const goHome = () => {
        setSearching(true)
        setFetching(false)
    }

    return (
    <View onLayout={onLayoutRootView}>
    <StatusBar />
    { searching ?
    <View className="flex justify-center items-center w-[100vw] h-[100vh]">
        <View className="items-center justify-center basis-5/12">
            <View>
                <Text className="text-6xl font-semibold text-center font-monty">Find My</Text>
                <Text className="text-6xl font-semibold text-center font-monty">Doctor</Text>
            </View>
        </View>
        <ScrollView className="bg-[#d9d9d9] w-full h-full rounded-t-[60px] basis-7/12">
            <View className="mb-12">
                <Text className="px-10 pt-8 text-3xl text-center font-monty">Check Availability of Doctor within</Text>
            </View>
            <View className="flex items-center">
                <View className="w-[100vw] mb-10 mx-5">
                    <View className="flex flex-row items-center">
                        <View className="flex items-center justify-center ml-4 mr-1 text-center basis-4/12">
                            <Text className="text-xl font-semibold font-monty">Distance</Text>
                        </View>
                        <View className="bg-white basis-6/12">
                            <Picker className="w-24"
                                selectedValue={selectedDistance}
                                onValueChange={itemValue => setSelectedDistance(itemValue)}
                                style={{fontSize:20}}
                            >
                                <Picker.Item label="2 km" value="2"/>
                                <Picker.Item label="3 km" value="3"/>
                                <Picker.Item label="5 km" value="5"/>
                                <Picker.Item label="7 km" value="7"/>
                                <Picker.Item label="10 km" value="10"/>
                                <Picker.Item label="15 km" value="15"/>
                            </Picker>
                        </View>
                    </View>
                </View>
                <View className="w-[100vw] mb-12 mx-5">
                    <View className="flex flex-row items-center">
                        <View className="flex items-center justify-center ml-4 mr-1 text-center basis-4/12">
                            <Text className="text-xl font-semibold font-monty">Specilisation</Text>
                        </View>
                        <View className="bg-white basis-6/12">
                            <Picker className="w-24"
                                selectedValue={selectedSpecilization}
                                onValueChange={itemValue => setSelectedSpecialization(itemValue)}
                                style={{fontSize:20}}
                            >
                                <Picker.Item label="General" value="General"/>
                                <Picker.Item label="Chat with AI" value="Chat with AI"/>
                                <Picker.Item label="Dentist" value="Dentist"/>
                                <Picker.Item label="Optometrists" value="Optometrists"/>
                                <Picker.Item label="Optometrists" value="Optometrists"/>
                                <Picker.Item label="Cardiologist" value="Cardiologist"/>
                                <Picker.Item label="Psychologist" value="Psychologist"/>
                                <Picker.Item label="Pulmonologist" value="Pulmonologist"/>
                                <Picker.Item label="Emergency" value="Emergency"/>
                                <Picker.Item label="Urologist" value="Urologist"/>
                                <Picker.Item label="Gynecologist" value="Gynecologist"/>
                                <Picker.Item label="Dermatologist" value="Dermatologist"/>
                                <Picker.Item label="Neurologist" value="Neurologist"/>
                                <Picker.Item label="Gastroenterologist" value="Gastroenterologist"/>
                                <Picker.Item label="Internal" value="Internal"/>
                                <Picker.Item label="Allergist" value="Allergist"/>
                                <Picker.Item label="Rheumatologist" value="Rheumatologist"/>
                                <Picker.Item label="ENT" value="ENT"/>
                                <Picker.Item label="Infectious" value="Infectious"/>
                            </Picker>
                        </View>
                    </View>
                </View>
                <View className="flex items-center">
                    <TouchableOpacity className="p-3 text-center bg-white rounded-lg"
                        onPress={()=>getLatLon()}
                        disabled={loading}
                    >
                        { loading ?
                            <Text className="text-2xl font-monty">Loading</Text> :
                            <Text className="text-2xl font-monty">Find</Text> 
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </View> :
        chat ?
            <View className="w-[100vw] h-[100vh]">
                <Chat 
        clientCoords={clientCoords} selectedDistance={selectedDistance} setChat={setChat} setFetching={setFetching} setDoctors={setDoctors}
                />
            </View>
        : fetching ?
        <View className="w-[100vw] h-[100vh] justify-center items-center">
            <Text className="p-5 text-5xl text-center font-monty">Finding your Best Doctor</Text>
        </View> :
        <View className="flex">
            <View className="pt-20 pb-10">
                <Text className="fixed px-5 text-3xl text-center font-monty">Highly Rated Doctors Near You with Lowest Waiting time</Text>
            </View>
            <ScrollView className="mb-52">
                { !doctors || doctors.length === 0 ?
                    <View className="flex w-[100vw] flex justify-center items-center">
                        <Text className="p-5 text-2xl text-center font-monty">No Doctor could be found with-in the location you set</Text>
                        <TouchableOpacity 
                            className="p-5 bg-[#d9d9d9] text-lg rounded-lg mt-5"
                            onPress={()=>goHome()}
                        >
                            <Text>Home</Text>
                        </TouchableOpacity>
                    </View> :
                    <ScrollView className="mb-60">
                        { doctors.map(( ele, idx )=>{
                            return( <Card key={idx} {...ele} clientCoords={clientCoords} /> )
                        })}
                        <View className="w-[100vw] flex justify-center items-center mt-5">
                            <TouchableOpacity 
                                className="p-5 bg-[#d9d9d9] text-lg rounded-lg"
                                onPress={()=>goHome()}
                            >
                                <Text className="text-lg font-monty">Home</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                }
            </ScrollView>
        </View>
        }
    </View>
  );
}

const Card = ({image_url, avg_wait_time, time, doctor_name, pending_patients_count, rating, latitude, longitude, clientCoords, viable} ) => {

    const redirectToGmap = () => {
        const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${clientCoords.latitude},${clientCoords.longitude}`;
        Linking.openURL(url)
    }

    return(
    <TouchableOpacity 
        className={`m-3 rounded-lg ${viable ? 'bg-[#d9d9d9]' : 'bg-[#000]' } flex flex-row py-2 pr-1`}
        onPress={()=>redirectToGmap()}
    >
        <View className="flex items-center justify-center basis-1/3">
            <Image
                source={{uri: image_url}}
                className="w-24 h-24 m-3 mx-auto rounded-full"
            />
        </View>
        <View className="flex items-center justify-center ml-1 basis-2/3">
            <View className="flex flex-col">
                <View className="py-1 pb-2">
                    <Text className="text-2xl font-monty">{doctor_name}</Text>
                </View>
                <View>
                    <View className="flex flex-row">
                        <View className="flex flex-row items-center basis-1/2">
                            <View className="flex">
                                <View className="flex flex-row items-center basis-1/2">
                                    <Entypo name="back-in-time" size={20} />
                                    <Text className="pl-2 text-md font-monty">{avg_wait_time}{" mins"}</Text>
                                </View>
                                <View className="flex flex-row items-center pt-1 basis-1/2">
                                    <Entypo name="users" size={18} />
                                    <Text className="pl-2 text-md font-monty">{pending_patients_count}{" patients"}</Text>
                                </View>
                            </View>
                        </View>
                        <View className="flex flex-row items-center basis-1/2">
                            <View className="flex">
                                <View className="flex flex-row items-center basis-1/2">
                                    <Entypo name="aircraft" size={20} />
                                    <Text className="pl-2 text-md font-monty">{time}{" mins"}</Text>
                                </View>
                                <View className="flex flex-row items-center pt-1 basis-1/2">
                                    <Entypo name="star" size={20} />
                                    <Text className="pl-2 text-md font-monty">{rating}{" stars"}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </TouchableOpacity>)
}

const Chat = ({clientCoords, selectedDistance, setChat, setFetching, setDoctors }) => {
  const [messages, setMessages] = useState([ 
      { 
          from: "model",
          message: "Hello There!\nTell us how you feel?",
          date: new Date(Date.now())
      }
  ]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false)
  const scrollViewRef = useRef();
  const simpSet = new Set(simpArr);
  const [found, setFound] = useState(false)
  const[specilisationArr, setSpecilisationArr] = useState([])
  const getResponse = async () => {
      const newMessage = {
          from: "user",
          message: query,
          date: new Date(Date.now())
      }
      setMessages((prev)=>[...prev, newMessage])
      const uQuery = query;
      setQuery("")

      try{
        setLoading(true)
        const { data } = await axios.post(BOT_URL,{
            "inputs": uQuery,
        },{
            headers: { Authorization: `Bearer ${TOKEN}` }
        })
        setLoading(false)
        if(data.length != 0){
            let bool = false;
            data.forEach(ele => {
                if(simpSet.has(ele.word.toLowerCase())) {
                    bool = true;
                    const botMsg = {
                        from: "model",
                        message: "Thank you for Sharing, we'll get Doctors suitable for you!!!",
                        date: new Date(Date.now())
                    }
                    setMessages(prev => [...prev, botMsg])
                    setFound(true)
                    setSpecilisationArr(mappedDoc[ele.word.toLowerCase()])
                }
            })
            if(!bool){
                const botMsg = {
                    from: "model",
                    message: "Could you explain me more?",
                    date: new Date(Date.now())
                }
                setMessages(prev => [...prev, botMsg])
            }
        }else{
            const botMsg = {
                from: "model",
                message: "Could you explain me more?",
                date: new Date(Date.now())
            }
            setMessages(prev => [...prev, botMsg])
        }
      }catch(err){
          console.log(err)
          const botMsg = {
            from: "model",
            message: "Sorry your request is not understood",
            date: new Date(Date.now())
          }
        setMessages(prev => [...prev, botMsg])
        setLoading(false)
        return;
      }
  }

  const searchDoc = async () => {
    setChat(false)
    setFetching(true)
    try{
        const { data } = await axios.post(API_URL+"doctor", {
            "latitude" : clientCoords.latitude,
            "longitude" : clientCoords.longitude,
            "dist": selectedDistance
        })
        const selectedDoctors = (data.sort((a, b) => b.viable - a.viable).filter(item => specilisationArr.includes(item.specialization.toLowerCase())).length === 0) ? data.sort((a, b) => b.viable - a.viable) :
            data.sort((a, b) => b.viable - a.viable).filter(item => specilisationArr.includes(item.specialization.toLowerCase()))
        setDoctors(selectedDoctors)
    } catch(err) {
        console.log(err)
        setDoctors([])
    }
    setFetching(false)
  }

  return (
    <View style={{ flex: 1 }}>
        <View className="mt-8">
            <Text className="px-5 text-xl text-center font-monty">Feel Free to share your Symptoms and get find Doctor</Text>
        </View>
        <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            className="flex p-2 mt-3 mb-28"
        >
            { messages.map((ele, idx) => {
                if(ele.from === "user") return <UChat {...ele} key={idx}/>
                else return <BChat {...ele} key={idx}/>
            }) }
            <View>
                {loading &&
                    <View className="flex flex-row justify-start my-2">
                        <View className="flex items-center justify-center pl-1">
                            <Image
                                source={{uri: BOT_PIC}}
                                className="w-10 h-10 border border-2 rounded-full border-[#8f96a0]"
                            />
                        </View>
                        <View className="px-3 py-2 mx-2 bg-white border border-2 rounded-lg border-[#8f96a0]">
                            <Text className="text-left text-[#7e7e7e] text-black text-md p-1 font-monty">Loading...</Text>
                        </View>
                    </View>
                }
                { found &&
                    <View className="w-[100vw] flex justify-center items-center mt-5 mb-10">
                        <TouchableOpacity 
                            className="bg-[#555] p-4 rounded-lg"
                            onPress={()=>searchDoc()}
                        >
                            <Text className="text-lg text-white font-monty">Find my Doctor</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </ScrollView>
        <KeyboardAvoidingView
          behavior="padding"
          className="absolute bottom-0 left-0 right-0 p-3 bg-white border border-t-[#dddddd]"
        >
        <View className="flex flex-row w-full mb-8">
            <TextInput
                className="border border-[#1c1c1c] px-2 py-2 mb-2 text-base basis-10/12 font-monty"
                placeholder="Type here..."
                value={query}
                onChangeText={(text) => setQuery(text)}
            />
            <TouchableOpacity
                className="flex items-center justify-center basis-2/12"
                onPress={()=>getResponse()}
                disabled={loading || found}
            >{ loading ?
                <ActivityIndicator size="large" color="#3498db"/> :
                <Entypo name="direction" size={25} />
            }
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    </View>
  );
}

const UChat = ({message, date}) => {
    return(
        <View className="flex flex-row justify-end my-2">
        <View className="bg-[#0084ff] px-3 py-2 rounded-lg mx-5">
            <Text className="text-base text-right text-white font-monty">{message}</Text>
            <Text className="mt-1 text-xs text-right text-white font-monty">{date.toString().slice(16,21)}</Text>
        </View>
    </View>)
}

const BChat = ({message, date}) => {
    return(<View className="flex flex-row justify-start my-2">
        <View className="flex items-center justify-center pl-1">
            <Image
                source={{uri: BOT_PIC}}
                className="w-10 h-10 border border-2 rounded-full border-[#8f96a0]"
            />
        </View>
        <View className="px-3 py-2 ml-3 mr-11 bg-white border border-2 rounded-lg border-[#8f96a0]">
            <Text className="text-base text-left text-black font-monty">{message}</Text>
            <Text className="mt-1 text-xs text-left font-monty">{date.toString().slice(16,21)}</Text>
        </View>
    </View>)
}

export default App;
