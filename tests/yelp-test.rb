require "selenium-webdriver"
require "rspec"
require_relative "signup_page.rb"
require_relative "users_page.rb"

timestamp = Time.now.to_i
username = "user#{timestamp}"
name = "name#{timestamp}"
email = "user#{timestamp}@test.com"
password = "password"


# TEST: Sign up for blog
describe "YelpSurf application" do
  describe "Sign up to YelpSurf" do
    it "Confirms that user has successfully signed up" do

      @driver = Selenium::WebDriver.for :firefox

      @driver.navigate.to "https://yelpsurf.herokuapp.com/register"

      #fill out form and submit
      signup = SignupPage.new(@driver)
      signup.enter_username(username)
      signup.enter_name(name)
      signup.enter_email(email)
      signup.enter_password(password)
      signup.submit()

      # Confirm user is signed up successfully
      users = UsersPage.new(@driver)
      banner_text = users.get_banner_text()
      expect(banner_text).to eq("Welcome to YelpSurf user#{timestamp}")

      @driver.quit
    end
  end
end
