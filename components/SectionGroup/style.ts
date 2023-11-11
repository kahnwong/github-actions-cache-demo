import styled from 'styled-components'

interface ISectionGroupWrapper {
  noPadFirst?: boolean
  noPadLast?: boolean
}

const SectionGroupWrapper = styled.div<ISectionGroupWrapper>`
  section {
    padding-top: 2rem;
    padding-bottom: 2rem;
    :first-child {
      padding-top: ${({ noPadFirst }) => (noPadFirst ? '0rem' : '2rem')};
    }
    :last-child {
      padding-bottom: ${({ noPadLast }) => (noPadLast ? '0rem' : '2rem')};
    }
  }
`

export { SectionGroupWrapper }
