require "selenium-webdriver"
require "rspec"

# TEST: Sign up for blog
describe "YelpSurf application" do
  describe "Sign up to YelpSurf" do
    it "Confirms that user has successfully signed up" do
      timestamp = Time.now.to_i

      driver = Selenium::WebDriver.for :firefox

      driver.navigate.to "https://yelpsurf.herokuapp.com/register"

      username_field = driver.find_element(id: 'inputUsername')
      username_field.send_keys("user#{timestamp}")

      name_field = driver.find_element(id: 'name')
      name_field.send_keys("name#{timestamp}")

      email_field = driver.find_element(id: 'inputEmail')
      email_field.send_keys("user#{timestamp}@test.com")

      password_field = driver.find_element(id: 'inputPassword')
      password_field.send_keys("password")

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
