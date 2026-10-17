import { Stack, Image } from "@chakra-ui/react"
import { ColorModeButton } from "./ui/color-mode"
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <Stack direction="row" justifyContent="space-between" >
        <Image src={logo} boxSize="100px"/>
        <ColorModeButton />
    </Stack>
  )
}

export default Navbar