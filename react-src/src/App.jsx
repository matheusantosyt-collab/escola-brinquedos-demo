import GooeyNav from './rb/GooeyNav/GooeyNav'
import SplitText from './rb/SplitText/SplitText'
import AnimatedContent from './rb/AnimatedContent/AnimatedContent'
import CountUp from './rb/CountUp/CountUp'
import BounceCards from './rb/BounceCards/BounceCards'
import LogoLoop from './rb/LogoLoop/LogoLoop'
import Magnet from './rb/Magnet/Magnet'
import ClickSpark from './rb/ClickSpark/ClickSpark'
export default function App() {
  return <main>{[GooeyNav, SplitText, AnimatedContent, CountUp, BounceCards, LogoLoop, Magnet, ClickSpark].length}</main>
}
