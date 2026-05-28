# models.py — table prefix: create_a_simple_full_stack_notes_applica
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base

class Item(Base):
    __tablename__ = "create_a_simple_full_stack_notes_applica_items"
    id          = Column(Integer, primary_key=True, index=True)
    title       = Column(String, index=True)
    description = Column(String, nullable=True)
    status      = Column(String, default="active")
    created_at  = Column(DateTime(timezone=True), server_default=func.now())
