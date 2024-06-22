/**
 * User form data class, has all required fields.
 */
export class UserFormData {
  constructor(user) {
    this.bio= user?.bio
    this.first_name= user?.first_name
    this.last_name= user?.last_name
    this.id = user?.id
    this.uid= user?.uid
  }
}
