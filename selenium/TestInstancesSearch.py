from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
import selenium.webdriver.support.ui as ui
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class TestInstancesSearch(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_search(self):
        driver = self.driver
        driver.get("http://marvelus.me/")
        driver.find_element_by_link_text("Movies").click()
        # Go to the search bar in instance page
        driver.find_element_by_xpath("/html/body/div[@id='root']/div/main/div[@class='container']/div[@class='row'][1]/div[@class='text-center']/form[@class='form-inline']/div[@class='form-group']/input[@id='formBasicText']").send_keys("Spider")
        # Wait for it to load
        time.sleep(5)
        self.assertRegexpMatches(driver.find_element_by_css_selector("BODY").text, r"^[\s\S]*Spider-Man: Homecoming[\s\S]*$")
        self.assertRegexpMatches(driver.find_element_by_css_selector("BODY").text, r"^[\s\S]*Untitled Spider-Man: Homecoming Sequel[\s\S]*$")
    
    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True
    
    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True
    
    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True
    
    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
