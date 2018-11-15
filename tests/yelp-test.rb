require "selenium-webdriver"
require "rspec"

timestamp = Time.now.to_i
username = "user#{timestamp}"
name = "name#{timestamp}"
email = "user#{timestamp}@test.com"
password = "password"

def enter_username(username)
  username_field = @driver.find_element(id: 'inputUsername')
  username_field.send_keys(username)
end

def enter_name(name)
  name_field = @driver.find_element(id: 'name')
  name_field.send_keys(name)
end

def enter_email(email)
  email_field = @driver.find_element(id: 'inputEmail')
  email_field.send_keys(email)
end

def enter_password(password)
  password_field = @driver.find_element(id: 'inputPassword')
  password_field.send_keys(password)
end

def submit()
  sign_up_button = @driver.find_element(class_name: 'btn-primary')
  sign_up_button.click
end

def get_banner_text()
  banner = @driver.find_element(class_name: 'alert')
  banner_text = banner.text
end

# TEST: Sign up for blog
describe "YelpSurf application" do
  describe "Sign up to YelpSurf" do
    it "Confirms that user has successfully signed up" do

      @driver = Selenium::WebDriver.for :firefox

      @driver.navigate.to "https://yelpsurf.herokuapp.com/register"

      #fill out form and submit
      enter_username(username)
      enter_name(name)
      enter_email(email)
      enter_password(password)
      submit()

      # Confirm user is signed up successfully
      banner_text = get_banner_text()
      expect(banner_text).to eq("Welcome to YelpSurf user#{timestamp}")

      @driver.quit
    end
  end
end
