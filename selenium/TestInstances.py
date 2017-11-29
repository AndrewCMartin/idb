from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
from selenium.webdriver.support.wait import WebDriverWait
import unittest, time, re

class TestInstances(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_instances(self):
        driver = self.driver
        driver.get("http://marvelus.me/")
        # Goes through all the tabs and checks all the URLs
        driver.find_element_by_link_text("Characters").click()
        self.assertEqual("http://marvelus.me/characters", driver.current_url)
        driver.find_element_by_xpath("/html/body/div[@id='root']/div/main/div[@class='container']/div[@class='row'][2]/div[@class='col-sm-4'][1]/a/div[@class='panel']/div[@class='panel-heading']/div[@class='panel-heading']/div/span/span").click()
        self.assertEqual("http://marvelus.me/character/1011334", driver.current_url)
        driver.find_element_by_link_text("Secret Invasion").click()
        self.assertEqual("http://marvelus.me/event/269", driver.current_url)
        driver.find_element_by_link_text("Captain America").click()
        driver.find_element_by_link_text("Chris Evans").click()
        self.assertRegexpMatches(driver.find_element_by_css_selector("BODY").text, r"^[\s\S]*1981-06-13[\s\S]*$")
        driver.find_element_by_link_text("The Avengers").click()
        self.assertEqual("http://marvelus.me/movie/24428", driver.current_url)
    
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
