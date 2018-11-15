class SignupPage
  
  #css selectors
  USERNAME_FIELD = {id: 'inputUsername'}
  NAME_FIELD = {id: 'name'}
  EMAIL_FIELD = {id: 'inputEmail'}
  PASSWORD_FIELD = {id: 'inputPassword'}
  SUBMIT_BUTTON = {class_name: 'btn-primary'}

  attr_reader :driver

  #class methods
  def initialize(driver)
    @driver = driver
  end

  def enter_username(username)
    username_field = @driver.find_element(USERNAME_FIELD)
    username_field.send_keys(username)
  end

  def enter_name(name)
    name_field = @driver.find_element(NAME_FIELD)
    name_field.send_keys(name)
  end

  def enter_email(email)
    email_field = @driver.find_element(EMAIL_FIELD)
    email_field.send_keys(email)
  end

  def enter_password(password)
    password_field = @driver.find_element(PASSWORD_FIELD)
    password_field.send_keys(password)
  end

  def submit()
    sign_up_button = @driver.find_element(SUBMIT_BUTTON)
    sign_up_button.click
  end

end
