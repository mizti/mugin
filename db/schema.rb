# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20160201123229) do

  create_table "companies", :force => true do |t|
    t.string   "ticker"
    t.string   "name"
    t.string   "year"
    t.decimal  "fixed_asset",            :precision => 10, :scale => 0
    t.decimal  "current_asset",          :precision => 10, :scale => 0
    t.decimal  "long_term_liabilities",  :precision => 10, :scale => 0
    t.decimal  "short_term_liabilities", :precision => 10, :scale => 0
    t.decimal  "equity",                 :precision => 10, :scale => 0
    t.decimal  "revenue",                :precision => 10, :scale => 0
    t.decimal  "operating_income",       :precision => 10, :scale => 0
    t.decimal  "ibit",                   :precision => 10, :scale => 0
    t.decimal  "net_income",             :precision => 10, :scale => 0
    t.decimal  "operation_cashflow",     :precision => 10, :scale => 0
    t.decimal  "financing_cashflow",     :precision => 10, :scale => 0
    t.decimal  "investment_cashflow",    :precision => 10, :scale => 0
    t.datetime "created_at",                                            :null => false
    t.datetime "updated_at",                                            :null => false
  end

end
