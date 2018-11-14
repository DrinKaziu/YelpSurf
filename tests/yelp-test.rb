require "selenium-webdriver"
require "rspec"

timestamp = Time.now.to_i
username = "user#{timestamp}"
name = "name#{timestamp}"
email = "user#{timestamp}@test.com"
password = "password"

# TEST: Sign up for blog
describe "YelpSurf application" do
  describe "Sign up to YelpSurf" do
    it "Confirms that user has successfully signed up" do

      driver = Selenium::WebDriver.for :firefox

      driver.navigate.to "https://yelpsurf.herokuapp.com/register"

      username_field = driver.find_element(id: 'inputUsername')
      username_field.send_keys(username)

      name_field = driver.find_element(id: 'name')
      name_field.send_keys(name)

      email_field = driver.find_element(id: 'inputEmail')
      email_field.send_keys(email)

      password_field = driver.find_element(id: 'inputPassword')
      password_field.send_keys(password)

      sign_up_button = driver.find_element(class_name: 'btn-primary')
      sign_up_button.click

      # Confirm user is signed up successfully
      banner = driver.find_element(class_name: 'alert')
      banner_text = banner.text
      expect(banner_text).to eq("Welcome to YelpSurf user#{timestamp}")

      driver.quit
    end
  end
end
