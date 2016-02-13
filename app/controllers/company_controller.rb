class CompanyController < ApplicationController
  respond_to :json
  def index
  end

  def search
  end

  def show
    #@company = {}
  end

  def add
    if session["data"] == nil or session["data"].class != Array then
      session["data"] = []
    end
    if params["ticker"] and params["year"] then
      hash = {"ticker" => params["ticker"].to_s, "year" => params["year"].to_s, "timestamp" => Time.now.to_i}
      session["data"].push hash
    end

    redirect_to("/company/show")
  end

  def data
    @company = {}
    if params[:ticker] != nil and params[:year] != nil
      @company = Company.where(ticker: params[:ticker]).where(year: params[:year]).first
      @company[:timestamp] = params[:timestamp]
      if @company == nil then 
        render :nothing => true
      else
        render json:  @company #idとか余分な要素も返却されてるのを直す
      end
    end
  end

end
