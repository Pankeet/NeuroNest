import './App.css'
import { Button } from './Components/ui/Button'
import { PlusSvg } from './Components/icons/plus';
import { ShareSvg } from "./Components/icons/share";
import { Card } from './Components/ui/Card';
function App() {

  return (
    <div className='p-4'>
      <div className='flex justify-end gap-3'>
      <Button startingIcon={<PlusSvg size="md" />} variant='primary' text='Add Content' size='sm' />
      <Button startingIcon={<ShareSvg size="md" />} variant="secondary" text='Share Brain' size="md" />
      </div>
      <div className='flex gap-6'>
        <Card type="youtube" link="https://www.youtube.com/watch?v=utCPBmXNez8" title="Trump" />
      </div>
    </div>
  )
}

export default App;
