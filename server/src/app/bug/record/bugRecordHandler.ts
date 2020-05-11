import bugRecordRepository from './bugRecordRepository'
import BugRecord from './bugRecord'

const bugRecordHandler = {
  async saveAllBugs (bugs) {
    for (const bug of bugs) {
      await bugRecordRepository.save(new BugRecord(bug))
    }
  }
}

export default bugRecordHandler
