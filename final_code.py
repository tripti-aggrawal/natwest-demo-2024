#!/usr/bin/env python
# coding: utf-8

# In[69]:


from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String,exists,Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session




app = FastAPI()

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database model
#individual customer db layout
class ItemP(Base):
    __tablename__ = "loansbiz"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    age = Column(Integer, index=True)
    annualincome = Column(Float, primary_key=True, index=True)
    requiredloanamount = Column(Float, index=True)
    existingloansamount = Column(Float, index=True)
#business customer db layout
class ItemB(Base):
    __tablename__ = "loansper"
    firm_id = Column(Integer, primary_key=True, index=True)
    firmname = Column(String, index=True)
    years_in_business = Column(Integer, index=True)
    loan_type = Column(String, primary_key=True, index=True)
    annualincome = Column(Float, primary_key=True, index=True)
    requiredloanamount = Column(Float, index=True)
    existingloansamount = Column(Float, index=True)


Base.metadata.create_all(bind=engine)

# Pydantic model
#individual customer db layout
class ItemCreateP(BaseModel):
    id:int
    name: str
    age: int
    citizencard: str
    annualincome: float
    requiredloanamount: float
    existingloansamount: float
#business customer db layout
class ItemCreateB(BaseModel):
    firm_id:int
    firmname: str
    years_in_business: int
    loan_type: str
    annualincome: float
    requiredloanamount: float
    existingloansamount: float
    

# Dependency
def get_db_biz():
    dbb = SessionLocal()
    try:
        yield dbb
    finally:
        dbb.close()
def get_db_per():
    dbp = SessionLocal()
    try:
        yield dbp
    finally:
        dbp.close()

# Create item endpoint
#post creation business
@app.post("/customers/business/user_profile/", response_model=ItemCreateB)
def create_itemb(item: ItemCreateB, dbb: Session = Depends(get_db_biz)):
    db_item = ItemB(firm_id=item.firm_id,firmname=item.firmname, years_in_business=item.years_in_business,loan_type=item.loan_type,annualincome=item.annualincome, requiredloanamount=item.requiredloanamount,existingloansamount=item.existingloansamount)
    dbb.add(db_item)
    dbb.commit()
    dbb.refresh(db_item)
    return db_item
#post creation personal
@app.post("/customers/personal/user_profile/", response_model=ItemCreateP)
def create_itemp(item: ItemCreateP, dbp: Session = Depends(get_db_per)):
    db_item = ItemP(id=item.id,name=item.name, age=item.age,citizencard=item.citizencard,annualincome=item.annualincome, requiredloanamount=item.requiredloanamount,existingloansamount=item.existingloansamount)
    dbp.add(db_item)
    dbp.commit()
    dbp.refresh(db_item)
    return db_item
#retrieving details business
@app.get("/customers/status/business/{firm_id}")
def read_itemb(firm_id: int, dbb: Session = Depends(get_db_biz)):
    item_exists=dbb.query(exists().where(ItemB.firm_id == firm_id)).scalar()
    if not item_exists:
        return "Item not found"
    else:
        from fastapi.responses import JSONResponse
        from fastapi.encoders import jsonable_encoder
        item_exists=dbb.query(ItemB).filter(ItemB.firm_id.in_([firm_id])).all()
        return JSONResponse(content=jsonable_encoder(item_exists))
#retrieving details personal
@app.get("/customers/status/personal/{id}")
def read_itemp(id: int, dbp: Session = Depends(get_db_per)):
    item_exists=dbp.query(exists().where(ItemP.id == id)).scalar()
    if not item_exists:
        return "Item not found"
    else:
        from fastapi.responses import JSONResponse
        from fastapi.encoders import jsonable_encoder
        item_exists=dbp.query(ItemP).filter(ItemP.id.in_([id])).all()
        return JSONResponse(content=jsonable_encoder(item_exists))


# In[70]:


#api calling
import asyncio
import uvicorn

if __name__ == "__main__":
    config = uvicorn.Config(app)
    server = uvicorn.Server(config)
    await server.serve()


# In[ ]:




