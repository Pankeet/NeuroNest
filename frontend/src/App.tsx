import './App.css'
import { Button } from './Components/ui/Button'
import { PlusSvg } from './Components/icons/plus';
import { ShareSvg } from "./Components/icons/share";
function App() {

  return (
    <>
      <Button startingIcon={<PlusSvg size="sm" />} variant='primary' text='Content' size='sm'/>
      <Button startingIcon={<ShareSvg size="md" />} variant="secondary" text='share' size="md" />
    </>
    
  )
}

export default App;
