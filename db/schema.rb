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

ActiveRecord::Schema.define(version: 20160919195834) do

  create_table "cities", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.integer  "state_id"
    t.string   "api"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["state_id"], name: "index_cities_on_state_id", using: :btree
  end

  create_table "city_companies", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "city_id"
    t.integer  "company_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city_id"], name: "index_city_companies_on_city_id", using: :btree
    t.index ["company_id"], name: "index_city_companies_on_company_id", using: :btree
  end

  create_table "companies", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.string   "location"
    t.float    "latitude",   limit: 24
    t.float    "longitude",  limit: 24
    t.string   "api"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  create_table "company_countries", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "company_id"
    t.integer  "country_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_company_countries_on_company_id", using: :btree
    t.index ["country_id"], name: "index_company_countries_on_country_id", using: :btree
  end

  create_table "company_jobs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "company_id"
    t.integer  "job_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_company_jobs_on_company_id", using: :btree
    t.index ["job_id"], name: "index_company_jobs_on_job_id", using: :btree
  end

  create_table "company_states", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "company_id"
    t.integer  "state_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_company_states_on_company_id", using: :btree
    t.index ["state_id"], name: "index_company_states_on_state_id", using: :btree
  end

  create_table "countries", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.string   "api"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "country_states", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "country_id"
    t.integer  "state_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["country_id"], name: "index_country_states_on_country_id", using: :btree
    t.index ["state_id"], name: "index_country_states_on_state_id", using: :btree
  end

  create_table "job_queries", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "job_id"
    t.integer  "query_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["job_id"], name: "index_job_queries_on_job_id", using: :btree
    t.index ["query_id"], name: "index_job_queries_on_query_id", using: :btree
  end

  create_table "jobs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "jobtitle"
    t.string   "formattedLocation"
    t.string   "source"
    t.datetime "date"
    t.string   "snippet"
    t.string   "url"
    t.string   "onmousedown"
    t.float    "latitude",              limit: 24
    t.float    "longitude",             limit: 24
    t.string   "jobkey"
    t.boolean  "sponsored"
    t.boolean  "expired"
    t.boolean  "indeedApply"
    t.string   "formattedLocationFull"
    t.string   "formattedRelativeTime"
    t.text     "job_summary",           limit: 65535
    t.integer  "company_id"
    t.string   "api"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["company_id"], name: "index_jobs_on_company_id", using: :btree
  end

  create_table "queries", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "keyword"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "states", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.integer  "country_id"
    t.string   "api"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["country_id"], name: "index_states_on_country_id", using: :btree
  end

end
