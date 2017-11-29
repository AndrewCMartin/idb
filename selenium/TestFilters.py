from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class TestFilters(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_filters(self):
        driver = self.driver
        driver.get("http://marvelus.me")
        driver.find_element_by_link_text("Actors").click()
        self.assertEqual("http://marvelus.me/actors", driver.current_url)
        # Get the 'Sort By:' drop down menu
        driver.find_element_by_id("dropdown-basic-${i}").click()
        self.assertRegexpMatches(driver.find_element_by_css_selector("BODY").text, r"^[\s\S]*Birthday[\s\S]*$")
        driver.find_element_by_link_text("Birthday").click()
        # Wait to load
        time.sleep(2)
        # All instances should be really old people
        self.assertRegexpMatches(driver.find_element_by_css_selector("BODY").text, r"^[\s\S]*Jack Kirby[\s\S]*$")
        self.assertRegexpMatches(driver.find_element_by_css_selector("BODY").text, r"^[\s\S]*Stan Lee[\s\S]*$")
        self.assertRegexpMatches(driver.find_element_by_css_selector("BODY").text, r"^[\s\S]*Harry Dean Stanton[\s\S]*$")
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
