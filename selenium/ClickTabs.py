from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class ClickTabs(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_click_tabs(self):
        driver = self.driver
        driver.get("http://www.marvelus.me")
        driver.find_element_by_link_text("About").click()
        # Warning: assertTextPresent may require manual changes
        self.assertRegexpMatches(driver.find_element_by_css_selector("BODY").text, r"^[\s\S]*Group Members[\s\S]*$")
        self.assertEqual("http://www.marvelus.me/about", driver.current_url)
        driver.find_element_by_link_text("Characters").click()
        self.assertEqual("http://www.marvelus.me/characters", driver.current_url)
        driver.find_element_by_link_text("Movies").click()
        self.assertEqual("http://www.marvelus.me/movies", driver.current_url)
        driver.find_element_by_link_text("TV Shows").click()
        self.assertEqual("http://www.marvelus.me/tvshows", driver.current_url)
        driver.find_element_by_link_text("Comic Series").click()
        self.assertEqual("http://www.marvelus.me/comicseries", driver.current_url)
        driver.find_element_by_link_text("Actors").click()
        self.assertEqual("http://www.marvelus.me/actors", driver.current_url)
        driver.find_element_by_link_text("Events").click()
        self.assertEqual("http://www.marvelus.me/events", driver.current_url)
    
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
