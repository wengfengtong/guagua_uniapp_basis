
import OtherApi from "./other/index"
import UserApi from "./user/index"

export default {
  other: new OtherApi(),
  UserApi: new UserApi(),
}