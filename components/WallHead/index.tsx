import Profile from 'components/Profile'
import { useUser } from 'contexts/userContext'
import { FC } from 'react'
import Container from 'react-bootstrap/Container'
import { Wrapper, WrapperBG } from './style'

const WallHead: FC = () => {
  const {
    state: { user }
  } = useUser()
  return (
    <Wrapper className='d-lg-none'>
      <WrapperBG />
      <Container
        className='position-relative'
        style={{ zIndex: 1, paddingTop: '56px' }}
      >
        <Profile
          position='head'
          name={user?.name}
          image={user?.picture}
          id={user?.id}
        />
      </Container>
    </Wrapper>
  )
}

export default WallHead
