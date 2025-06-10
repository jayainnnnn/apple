from sqlalchemy import Column,String,Integer,Date
from database import Base

class macbook_prices(Base):
    __tablename__ = "macbook prices"
    ID = Column(Integer, primary_key=True, autoincrement=True)
    PRODUCT_NAME = Column(String, nullable=False)
    PRODUCT_PRICE = Column(Integer, nullable=False)
    DATE = Column(Date, nullable=False)
    SOURCE = Column(String,nullable=False)
