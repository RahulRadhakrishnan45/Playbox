import { HStack, Image } from "@chakra-ui/react"
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <HStack>
        <Image src={logo} boxSize="100px" />
    </HStack>
  )
}

export default Navbar