import React from 'react'
import { Button} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const GetToSwiping = () => {
  return (
      <Button color='pink' as={Link} to="/">
        ~Get to Swiping~
      </Button>
  )
}

export default GetToSwiping
