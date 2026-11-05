import { memo } from 'react'
import { AmbientExperience } from './AmbientExperience'
import { AmbientAchievements } from './AmbientAchievements'
import { AmbientSkills } from './AmbientSkills'
import { AmbientLearning } from './AmbientLearning'
import { AmbientAbout } from './AmbientAbout'
import { AmbientGithub } from './AmbientGithub'
import { AmbientContact } from './AmbientContact'

export const SectionAmbiance = memo(function SectionAmbiance({
  id,
  visible,
}: {
  id: string
  visible: boolean
}) {
  switch (id) {
    case 'experience':
      return <AmbientExperience visible={visible} />
    case 'achievements':
      return <AmbientAchievements visible={visible} />
    case 'skills':
      return <AmbientSkills visible={visible} />
    case 'learning':
      return <AmbientLearning visible={visible} />
    case 'about':
      return <AmbientAbout visible={visible} />
    case 'github':
      return <AmbientGithub visible={visible} />
    case 'contact':
      return <AmbientContact visible={visible} />
    default:
      return null
  }
})

