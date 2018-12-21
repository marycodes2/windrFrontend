import React from 'react'
import { Button} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const GetToSwiping = () => {
  return (
      <Button as={Link} to="/" primary>
        ~Get to Swiping~
      </Button>
  )
}

export default GetToSwiping
