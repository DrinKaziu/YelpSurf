class UsersPage
  
  #css selectors
  SUCCESS_BANNER = {class_name: 'alert'}

  attr_reader :driver

  #class methods
  def initialize(driver)
    @driver = driver
  end

  def get_banner_text()
    banner = @driver.find_element(SUCCESS_BANNER)
    banner_text = banner.text
  end
end
