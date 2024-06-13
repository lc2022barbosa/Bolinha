import { useState, useEffect } from 'react'
import { SafeAreaView, Text, View, TouchableOpacity, ImageBackground,Image } from 'react-native'
import { styles } from './styles'
import { Ball } from './components/Ball'


let timer: number

export default function App() {
  // Valor da gravidade da terra
  const [gravity, setGravity] = useState(0.98)

  const [upForce, setUpForce] = useState(0)
  const [speed, setSpeed] = useState(0)
  const [posY, setPosY] = useState(0)

  // Efeito colateral
  useEffect(() => {
    const applyGravity = () => {
      // decremento da gravidade
      let newUpForce = upForce - gravity
      newUpForce = newUpForce < 0 ? 0 : newUpForce
      setUpForce(newUpForce)

      // modificador da velocidade
      let newSpeed = speed + (gravity - (newUpForce / 2))
      setSpeed(newSpeed)

      // calculo da posição da bolinha
      let newPosY = posY - newSpeed

      if (newPosY < 0) {
        newPosY = 0
        setSpeed(0)
      }
      setPosY(newPosY)
    }

    clearTimeout(timer)

    timer = setTimeout(applyGravity, 30)
  }, [gravity, upForce, speed, posY])

  const handleForceButton = () => {
    setUpForce(7)
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.area}>
        <Ball posY={posY}/>
      </View>
            <Image
              style={styles.logo}
              source={require('./assets/19.png')}
            />
     

      <View style={styles.control}>
        <View>
          <Text style={styles.controlText}>UpForce: {upForce.toFixed(2)}</Text>
          <Text style={styles.controlText}>Speed: {speed.toFixed(2)}</Text>
          <Text style={styles.controlText}>PosY: {posY.toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={handleForceButton}
        >
          <Text style={styles.controlText}>CLICK</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}