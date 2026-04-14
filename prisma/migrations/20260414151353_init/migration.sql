-- CreateTable
CREATE TABLE "Assumption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "convictionScore" INTEGER NOT NULL DEFAULT 50,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Evidence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assumptionId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "sourceUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Evidence_assumptionId_fkey" FOREIGN KEY ("assumptionId") REFERENCES "Assumption" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assumptionId" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Comment_assumptionId_fkey" FOREIGN KEY ("assumptionId") REFERENCES "Assumption" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Competency" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "AutonomyRating" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "competencyId" TEXT NOT NULL,
    "timeframe" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 1,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AutonomyRating_competencyId_fkey" FOREIGN KEY ("competencyId") REFERENCES "Competency" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ServiceLine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "currentPricing" TEXT,
    "proposedPricing" TEXT,
    "aiDeliveryModel" TEXT,
    "marketOpportunity" TEXT,
    "status" TEXT NOT NULL DEFAULT 'exploring',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ServiceAssumptionLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serviceLineId" TEXT NOT NULL,
    "assumptionId" TEXT NOT NULL,
    CONSTRAINT "ServiceAssumptionLink_serviceLineId_fkey" FOREIGN KEY ("serviceLineId") REFERENCES "ServiceLine" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ServiceAssumptionLink_assumptionId_fkey" FOREIGN KEY ("assumptionId") REFERENCES "Assumption" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Scenario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "assumptionStates" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "AutonomyRating_competencyId_timeframe_key" ON "AutonomyRating"("competencyId", "timeframe");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceAssumptionLink_serviceLineId_assumptionId_key" ON "ServiceAssumptionLink"("serviceLineId", "assumptionId");
