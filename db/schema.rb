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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160905151448) do

  create_table "cities", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.integer  "state_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["state_id"], name: "index_cities_on_state_id", using: :btree
  end

  create_table "cities_companies", id: false, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "city_id",    null: false
    t.integer "company_id", null: false
    t.index ["city_id", "company_id"], name: "index_cities_companies_on_city_id_and_company_id", using: :btree
    t.index ["company_id", "city_id"], name: "index_cities_companies_on_company_id_and_city_id", using: :btree
  end

  create_table "cities_states", id: false, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "state_id", null: false
    t.integer "city_id",  null: false
    t.index ["city_id", "state_id"], name: "index_cities_states_on_city_id_and_state_id", using: :btree
    t.index ["state_id", "city_id"], name: "index_cities_states_on_state_id_and_city_id", using: :btree
  end

  create_table "companies", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "companies_jobs", id: false, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "company_id", null: false
    t.integer "job_id",     null: false
    t.index ["company_id", "job_id"], name: "index_companies_jobs_on_company_id_and_job_id", using: :btree
    t.index ["job_id", "company_id"], name: "index_companies_jobs_on_job_id_and_company_id", using: :btree
  end

  create_table "countries", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "countries_states", id: false, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "country_id", null: false
    t.integer "state_id",   null: false
    t.index ["country_id", "state_id"], name: "index_countries_states_on_country_id_and_state_id", using: :btree
    t.index ["state_id", "country_id"], name: "index_countries_states_on_state_id_and_country_id", using: :btree
  end

  create_table "jobs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.string   "job_key"
    t.integer  "company_id"
    t.string   "job_title"
    t.float    "longitude",  limit: 24
    t.float    "latitude",   limit: 24
    t.string   "platform"
    t.datetime "date"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.index ["company_id"], name: "index_jobs_on_company_id", using: :btree
  end

  create_table "jobs_queries", id: false, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "query_id", null: false
    t.integer "job_id",   null: false
    t.index ["job_id", "query_id"], name: "index_jobs_queries_on_job_id_and_query_id", using: :btree
    t.index ["query_id", "job_id"], name: "index_jobs_queries_on_query_id_and_job_id", using: :btree
  end

  create_table "queries", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "keyword"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "states", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.integer  "country_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["country_id"], name: "index_states_on_country_id", using: :btree
  end

  add_foreign_key "cities", "states"
  add_foreign_key "jobs", "companies"
  add_foreign_key "states", "countries"
end
